import { useState } from 'react';
import { Button } from '@/generated/components/ui/button';
import { Input } from '@/generated/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/generated/components/ui/dialog';
import { validateToken } from '@/api/products';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (token: string) => void;
}

export function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const valid = await validateToken(password);
    setLoading(false);
    if (valid) {
      onLogin(password);
      setPassword('');
      onOpenChange(false);
    } else {
      setError(true);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">Incorrect password.</p>}
          <Button type="submit" disabled={loading || !password}>
            {loading ? 'Checking...' : 'Login'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
