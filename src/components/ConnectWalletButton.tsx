
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConnectWalletButtonProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const ConnectWalletButton = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
}: ConnectWalletButtonProps) => {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (!isConnected) {
    return (
      <Button onClick={onConnect} className="bg-purple-600 hover:bg-purple-700">
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-purple-500 text-purple-400">
          <Wallet className="w-4 h-4 mr-2" />
          {walletAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
        <DropdownMenuItem onClick={copyAddress} className="text-gray-300 hover:text-white">
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDisconnect} className="text-red-400 hover:text-red-300">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
