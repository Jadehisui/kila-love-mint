
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Search, Sparkles, Loader2 } from "lucide-react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMinting, setIsSearchMinting] = useState(false);
  const { toast } = useToast();

  const nftImages = [
    "/lovable-uploads/29f9dbfc-369b-48b1-b6f9-04dd72e38269.png",
    "/lovable-uploads/54af1246-130b-4474-9962-a833ccc7ac0f.png",
    "/lovable-uploads/92c161df-be69-4d7f-8b7a-c93323b477c1.png",
    "/lovable-uploads/a72e8011-385a-4d20-8c83-78bce22fdd86.png"
  ];

  const handleWalletConnect = async () => {
    try {
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

  const handleMint = async () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      });
      return;
    }

    setIsMinting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Minting Successful!",
        description: "Successfully minted your Kila NFT!",
      });
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  const handleSearchMint = async () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      });
      return;
    }

    if (!searchQuery.trim()) {
      toast({
        title: "Enter NFT Name",
        description: "Please enter the name of the 1-of-1 NFT you want to mint",
        variant: "destructive",
      });
      return;
    }

    setIsSearchMinting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "1-of-1 NFT Minted!",
        description: `Successfully minted "${searchQuery}" to your wallet!`,
      });
      setSearchQuery("");
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "Failed to mint 1-of-1 NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearchMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/29f9dbfc-369b-48b1-b6f9-04dd72e38269.png" 
                alt="Kila Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-white">Kila</h1>
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
          <h2 className="text-6xl font-bold text-white mb-6">
            Kila NFT Collection
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover and mint unique Kila NFTs on the Sui blockchain. Connect your wallet and start collecting!
          </p>

          {/* NFT Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {nftImages.map((image, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-white transition-colors">
                <img 
                  src={image} 
                  alt={`Kila NFT ${index + 1}`} 
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <p className="text-gray-400 text-sm">Kila #{index + 1}</p>
              </div>
            ))}
          </div>

          {/* Main Mint Button */}
          <Button
            onClick={handleMint}
            disabled={!isWalletConnected || isMinting}
            className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 text-lg border-2 border-white"
          >
            {isMinting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Minting...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Mint Kila NFT
              </>
            )}
          </Button>

          {!isWalletConnected && (
            <p className="text-yellow-400 text-sm mt-4">
              Connect your wallet to start minting
            </p>
          )}
        </div>
      </section>

      {/* Search & Mint 1-of-1 Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-6">
              Mint Your 1-of-1 NFT
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Search for and mint unique 1-of-1 Kila NFTs
            </p>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Find Your Unique NFT
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter the name of the 1-of-1 NFT you want to mint
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter NFT name..."
                    className="bg-gray-800 border-gray-600 text-white flex-1"
                  />
                </div>
                
                <Button
                  onClick={handleSearchMint}
                  disabled={!isWalletConnected || isSearchMinting || !searchQuery.trim()}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 border-2 border-white"
                >
                  {isSearchMinting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Minting 1-of-1...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Mint 1-of-1 NFT
                    </>
                  )}
                </Button>

                {!isWalletConnected && (
                  <p className="text-yellow-400 text-sm text-center">
                    Connect your wallet to mint 1-of-1 NFTs
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Kila. Built on Sui Blockchain.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
