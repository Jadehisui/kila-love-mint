
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Zap, Crown, Users, Star } from "lucide-react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { MintingSection } from "@/components/MintingSection";
import { OGMintingSection } from "@/components/OGMintingSection";
import { StatsSection } from "@/components/StatsSection";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const handleWalletConnect = async () => {
    try {
      // Simulate wallet connection for demo
      setIsWalletConnected(true);
      setWalletAddress("0x1234...abcd");
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Sui wallet",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SuiNFT</h1>
          </div>
          <ConnectWalletButton
            isConnected={isWalletConnected}
            walletAddress={walletAddress}
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Mint Exclusive NFTs on Sui
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and mint unique digital collectibles on the fastest blockchain. 
            Join our exclusive community and unlock rare 1-of-1 NFTs.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Badge variant="secondary" className="text-purple-400 border-purple-400">
              <Users className="w-4 h-4 mr-1" />
              5,000+ Minted
            </Badge>
            <Badge variant="secondary" className="text-pink-400 border-pink-400">
              <Star className="w-4 h-4 mr-1" />
              Premium Collection
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      <Separator className="bg-gray-800" />

      {/* Main Minting Section */}
      <section id="mint" className="py-20">
        <div className="container mx-auto px-4">
          <MintingSection 
            isWalletConnected={isWalletConnected}
            walletAddress={walletAddress}
          />
        </div>
      </section>

      <Separator className="bg-gray-800" />

      {/* OG Minting Section */}
      <section id="og-mint" className="py-20">
        <div className="container mx-auto px-4">
          <OGMintingSection 
            isWalletConnected={isWalletConnected}
            walletAddress={walletAddress}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/20 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 SuiNFT. Built on Sui Blockchain.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
