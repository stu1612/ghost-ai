"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MockProject } from "@/hooks/use-project-dialogs";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
  slug: string;
  slugIsValid: boolean;
  onNameChange: (name: string) => void;
}

export function CreateProjectDialog({
  open,
  onClose,
  onSubmit,
  name,
  slug,
  slugIsValid,
  onNameChange,
}: CreateProjectDialogProps) {
  const canSubmit = name.trim().length > 0 && slugIsValid;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-copy-primary">New Project</DialogTitle>
          <DialogDescription className="text-ai-text">
            Give your project a name.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-project-name"
              className="text-sm font-medium text-copy-primary"
            >
              Project name
            </label>
            <Input
              id="create-project-name"
              placeholder="My Project"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSubmit) onSubmit();
              }}
              autoFocus
            />
          </div>
          {name && !slugIsValid && (
            <p className="text-xs text-error">
              Name must contain at least one letter or number.
            </p>
          )}
          {name && slugIsValid && (
            <p className="text-xs text-muted-foreground">
              Slug: <span className="font-mono text-foreground">{slug}</span>
            </p>
          )}
        </div>
        <DialogFooter showCloseButton>
          <Button disabled={!canSubmit} onClick={onSubmit}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface RenameProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  project: MockProject | null;
  name: string;
  onNameChange: (name: string) => void;
}

export function RenameProjectDialog({
  open,
  onClose,
  onSubmit,
  project,
  name,
  onNameChange,
}: RenameProjectDialogProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && name.trim() && name !== project?.name) {
      onSubmit();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-copy-primary">
            Rename Project
          </DialogTitle>
          {project && (
            <DialogDescription className="text-ai-text">
              Renaming &ldquo;{project.name}&rdquo;
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="rename-project-name"
            className="text-sm font-medium text-copy-primary"
          >
            Project name
          </label>
          <Input
            id="rename-project-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <DialogFooter showCloseButton>
          <Button
            disabled={!name.trim() || name === project?.name}
            onClick={onSubmit}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  project: MockProject | null;
}

export function DeleteProjectDialog({
  open,
  onClose,
  onConfirm,
  project,
}: DeleteProjectDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-copy-primary">
            Delete Project
          </DialogTitle>
          <DialogDescription className="text-ai-text">
            Are you sure you want to delete{" "}
            <span className="font-medium text-copy-primary">
              {project?.name}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
