-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);
