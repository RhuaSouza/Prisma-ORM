import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import multer from "multer";
import path from "path";
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const unicoSufix = Date.now() + "-" + Math.round(Math.random() * 10);
    cb(null, unicoSufix + "-" + file.originalname);
  },
});

const upload = multer({ storage });
app.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.post("/buscarUsuario", async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.body;
    const loginUser = await prisma.usuarios.findUnique({
      where: { email: String(userEmail) },
    });

    if (!loginUser) {
      res.status(404).json({ message: "usuário nao encontrado" });
    }
    console.log(loginUser);
    res.status(200).json(loginUser);
  } catch (error) {
    console.log(error);
  }
});
app.post("/addUsuarios", async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha,
      },
    });

    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
  }
});

app.put("/atualizarUsuario/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, senha } = req.body;
  const usuarioAtualizado = await prisma.usuarios.update({
    where: { id: parseInt(id) },
    data: {
      nome,
      senha,
    },
  });

  res.status(200).json(usuarioAtualizado);
});

app.delete("/deletarUsuario/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioApagado = await prisma.usuarios.delete({
    where: { id: parseInt(id) },
  });
  res.status(200).json(usuarioApagado);
});

app.post("/loginUsuario", async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      res.status(404).json({ message: "usuario nao encontrado" });
      return;
    }

    if (usuario.senha != senha) {
      res.status(401).json({ message: "senha incorreta" });
      return;
    }
    res.status(200).json({ message: "Login realizado com sucesso!", usuario });
  } catch (error) {
    console.log(error);
  }
});

app.post(
  "/foto_perfil",
  upload.single("foto"),
  async (req: Request, res: Response) => {
    const { userId } = req.body;
    const file: Express.Multer.File | undefined = req.file;
    if (!file) {
      res.json({ message: "nenhuma imagem encontrada" });
      return;
    }

    const photoUrl = `/uploads/${file.filename}`;

    try {
      const user = await prisma.usuarios.update({
        where: { id: Number(userId) },
        data: { fotoUrl: photoUrl },
      });

      res.json({ message: "Foto Atualizada", photoUrl, usuario: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
  console.log("com sucesso!");
});
