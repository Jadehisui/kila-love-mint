
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Plus, Minus } from "lucide-react";

interface MintingSectionProps {
  isWalletConnected: boolean;
  walletAddress: string;
}

export const MintingSection = ({ isWalletConnected, walletAddress }: MintingSectionProps) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();

  const mintPrice = 0.1; // SUI
  const maxMint = 10;
  const totalSupply = 10000;
  const minted = 3847;

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
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Minting Successful!",
        description: `Successfully minted ${mintAmount} NFT${mintAmount > 1 ? 's' : ''} for ${(mintAmount * mintPrice).toFixed(1)} SUI`,
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

  const adjustMintAmount = (delta: number) => {
    const newAmount = Math.max(1, Math.min(maxMint, mintAmount + delta));
    setMintAmount(newAmount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-white mb-4">
          Public Mint
        </h3>
        <p className="text-gray-300 text-lg mb-6">
          Mint your NFTs from our exclusive collection
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="text-center">
            <p className="text-gray-400">Minted</p>
            <p className="text-2xl font-bold text-purple-400">{minted.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Total Supply</p>
            <p className="text-2xl font-bold text-white">{totalSupply.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Price</p>
            <p className="text-2xl font-bold text-green-400">{mintPrice} SUI</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview Card */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Preview</CardTitle>
            <CardDescription className="text-gray-400">
              Your NFT will be randomly generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-16 h-16 text-white opacity-50" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Rarity:</span>
                <Badge variant="secondary">Common - Legendary</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Traits:</span>
                <span className="text-white">5-8 traits</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Minting Controls */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Mint NFTs</CardTitle>
            <CardDescription className="text-gray-400">
              Choose how many NFTs to mint (max {maxMint})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Selector */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Amount</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustMintAmount(-1)}
                  disabled={mintAmount <= 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(Math.max(1, Math.min(maxMint, parseInt(e.target.value) || 1)))}
                  className="text-center bg-gray-800 border-gray-600 text-white"
                  min={1}
                  max={maxMint}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustMintAmount(1)}
                  disabled={mintAmount >= maxMint}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Cost:</span>
                <span className="text-2xl font-bold text-green-400">
                  {(mintAmount * mintPrice).toFixed(1)} SUI
                </span>
              </div>
            </div>

            {/* Mint Button */}
            <Button
              onClick={handleMint}
              disabled={!isWalletConnected || isMinting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Mint {mintAmount} NFT{mintAmount > 1 ? 's' : ''}
                </>
              )}
            </Button>

            {!isWalletConnected && (
              <p className="text-sm text-yellow-400 text-center">
                Connect your wallet to start minting
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
