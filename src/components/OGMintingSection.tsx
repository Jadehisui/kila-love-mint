
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Crown, Upload, Loader2, Star, Lock } from "lucide-react";

interface OGMintingSectionProps {
  isWalletConnected: boolean;
  walletAddress: string;
}

export const OGMintingSection = ({ isWalletConnected, walletAddress }: OGMintingSectionProps) => {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [isOGUser, setIsOGUser] = useState(true); // Simulate OG status
  const { toast } = useToast();

  const ogMintPrice = 0.5; // SUI for 1-of-1 custom NFTs

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleOGMint = async () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      });
      return;
    }

    if (!isOGUser) {
      toast({
        title: "Access Denied",
        description: "Only OG users can mint custom 1-of-1 NFTs",
        variant: "destructive",
      });
      return;
    }

    if (!nftName.trim() || !nftDescription.trim() || !selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select an image",
        variant: "destructive",
      });
      return;
    }

    setIsMinting(true);
    
    try {
      // Simulate custom NFT minting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Custom NFT Minted Successfully!",
        description: `"${nftName}" has been minted as a unique 1-of-1 NFT for ${ogMintPrice} SUI`,
      });
      
      // Reset form
      setNftName("");
      setNftDescription("");
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "Failed to mint custom NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  if (!isOGUser) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-12">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">
            OG Exclusive Area
          </h3>
          <p className="text-gray-400 text-lg mb-6">
            This section is reserved for OG community members only.
          </p>
          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
            <Crown className="w-4 h-4 mr-1" />
            OG Access Required
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
            <Crown className="w-4 h-4 mr-1" />
            OG EXCLUSIVE
          </Badge>
        </div>
        <h3 className="text-4xl font-bold text-white mb-4">
          Custom 1-of-1 NFT Minting
        </h3>
        <p className="text-gray-300 text-lg mb-6">
          Create your unique, personalized NFT with custom artwork and metadata
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="text-center">
            <p className="text-gray-400">OG Price</p>
            <p className="text-2xl font-bold text-yellow-400">{ogMintPrice} SUI</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Rarity</p>
            <p className="text-2xl font-bold text-orange-400">1-of-1</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Royalties</p>
            <p className="text-2xl font-bold text-green-400">5%</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload and Preview */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Upload Artwork
            </CardTitle>
            <CardDescription className="text-gray-400">
              Upload your custom artwork (PNG, JPG, GIF - max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {selectedFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg mb-2"
                    />
                    <p className="text-sm text-green-400">{selectedFile.name}</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Click to upload your artwork</p>
                  </div>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* NFT Details */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-400" />
              NFT Details
            </CardTitle>
            <CardDescription className="text-gray-400">
              Customize your NFT's metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* NFT Name */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">NFT Name</label>
              <Input
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="Enter your NFT name"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            {/* NFT Description */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Description</label>
              <Textarea
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                placeholder="Describe your NFT..."
                className="bg-gray-800 border-gray-600 text-white"
                rows={4}
              />
            </div>

            {/* Total Cost */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">OG Mint Cost:</span>
                <span className="text-2xl font-bold text-yellow-400">
                  {ogMintPrice} SUI
                </span>
              </div>
            </div>

            {/* Mint Button */}
            <Button
              onClick={handleOGMint}
              disabled={!isWalletConnected || isMinting || !nftName.trim() || !nftDescription.trim() || !selectedFile}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3"
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Your 1-of-1...
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Mint Custom 1-of-1 NFT
                </>
              )}
            </Button>

            {!isWalletConnected && (
              <p className="text-sm text-yellow-400 text-center">
                Connect your wallet to mint your custom NFT
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
