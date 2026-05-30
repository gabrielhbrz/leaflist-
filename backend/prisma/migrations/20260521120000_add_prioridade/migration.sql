-- Add the missing prioridade column to the Tarefa table
ALTER TABLE "Tarefa"
ADD COLUMN "prioridade" TEXT NOT NULL DEFAULT 'media';
