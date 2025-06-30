import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Search, Sparkles, Loader2 } from "lucide-react";
import { useWallet, ConnectModal, useAccountBalance } from '@suiet/wallet-kit';
import { useSuiClientQuery } from '@mysten/dapp-kit';
import "@suiet/wallet-kit/style.css"

const Index = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mintQuantity, setMintQuantity] = useState(1);
  const [whitelistQuantity, setWhitelistQuantity] = useState(1);
  const [isWhitelistMinting, setIsWhitelistMinting] = useState(false);
  const [isSearchMinting, setIsSearchMinting] = useState(false);
  const [whitelistId, setWhitelistId] = useState("");
  const { toast } = useToast();

  const { connected, address, disconnect } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const { error, loading, balance } = useAccountBalance();

  const { data, isPending, refetch } = useSuiClientQuery('getOwnedObjects', {
    owner: address,
    filter: {
      MatchAll: [
        {
          "StructType": "0x2::kila::Kila"
        }
      ]
    },
  });
  useEffect(() => {
    if (data?.data?.[0]?.data?.objectId) {
      setWhitelistId(data.data[0].data.objectId as string);
    }
  }, [data]);
  console.log(whitelistId);

  const isWhitelisted = connected && whitelistId !== "";

  const nftImages = [
    "/lovable-uploads/29f9dbfc-369b-48b1-b6f9-04dd72e38269.png",
    "/lovable-uploads/54af1246-130b-4474-9962-a833ccc7ac0f.png",
    "/lovable-uploads/92c161df-be69-4d7f-8b7a-c93323b477c1.png",
    "/lovable-uploads/a72e8011-385a-4d20-8c83-78bce22fdd86.png"
  ];


  const handleMint = async () => {
    if (!connected) {
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
        description: `Successfully minted ${mintQuantity} Kila NFT${mintQuantity > 1 ? 's' : ''}!`,

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

  const handleWhitelistMint = async () => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      });
      return;
    }

    setIsWhitelistMinting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Whitelist Mint Successful!",
        description: `Successfully minted ${whitelistQuantity} whitelist NFT${whitelistQuantity > 1 ? 's' : ''}!`,
      });
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "Failed to mint whitelist NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsWhitelistMinting(false);
    }
  };


  const handleSearchMint = async () => {
    if (!connected) {
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
          <div className="relative">
            <button
              onClick={() => {
                if (connected) {
                  setShowModal(prev => !prev);
                } else {
                  setShowModal(true);
                }
              }}
              className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded"
            >
              {connected
                ? `${address.slice(0, 5)}...${address.slice(-5)} • ${loading ? '...' : `${(Number(balance) / 1e9).toFixed(2)} SUI`}`
                : 'Connect'}
            </button>

            {connected && showModal && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    disconnect();
                    setShowModal(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Disconnect
                </button>
              </div>
            )}

            {!connected && (
              <ConnectModal
                open={showModal}
                onOpenChange={(open) => setShowModal(open)}
              />
            )}
          </div>


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

          <div className="mb-12">
            <div className="md:grid md:grid-cols-4 gap-6 hidden max-w-4xl mx-auto">
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

            {/* Horizontal scroll on small screens */}
            <div className="md:hidden overflow-x-auto">
              <div className="flex space-x-4 px-4">
                {nftImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-white transition-colors"
                  >
                    <img
                      src={image}
                      alt={`Kila NFT ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <p className="text-gray-400 text-sm">Kila #{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="flex items-center justify-center space-x-2 mb-6">
            <Button
              variant="outline"
              onClick={() => setMintQuantity(prev => Math.max(1, prev - 1))}
              className="w-12 h-12 text-lg"
            >
              -
            </Button>

            <Button
              onClick={handleMint}
              disabled={!connected || isMinting}
              className="w-56 h-12 bg-white hover:bg-gray-200 text-black font-bold text-lg border-2 border-white flex items-center justify-center space-x-2"
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Minting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Mint {mintQuantity > 1 ? `${mintQuantity} Kila` : 'Kila'}</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setMintQuantity(prev => prev + 1)}
              className="w-12 h-12 text-lg"
            >
              +
            </Button>
          </div>

          {isWhitelisted && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setWhitelistQuantity(prev => Math.max(1, prev - 1))}
                className="w-12 h-12 text-lg"
              >
                -
              </Button>

              <Button
                onClick={handleWhitelistMint}
                disabled={!connected || isWhitelistMinting}
                className="w-56 h-12 bg-white hover:bg-gray-200 text-black font-bold text-lg border-2 border-white flex items-center justify-center space-x-2"
              >
                {isWhitelistMinting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Minting Whitelist...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>
                      Mint kila {whitelistQuantity > 1 ? `${whitelistQuantity} Whitelist` : 'Whitelist'}
                    </span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => setWhitelistQuantity(prev => Math.min(4, prev + 1))}
                className="w-12 h-12 text-lg"
              >
                +
              </Button>
            </div>
          )}



          {!connected && (
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
                  disabled={!connected || isSearchMinting || !searchQuery.trim()}
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

                {!connected && (
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
          <p className="text-gray-400">© 2025 Kila. Built on Sui Blockchain.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
