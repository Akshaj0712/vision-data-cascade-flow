
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileType } from "lucide-react";
import { readFile } from "@/services/pythonService";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onFileUploaded: (file: File) => void;
  acceptedTypes: string;
  onDataParsed?: (data: any[]) => void;
}

const FileUpload = ({ onFileUploaded, acceptedTypes, onDataParsed }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);

    try {
      onFileUploaded(file);

      // If onDataParsed is provided, read the file and parse it
      if (onDataParsed) {
        const data = await readFile(file);
        onDataParsed(data);
      }

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed.`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error uploading file",
        description: "There was an error processing your file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-xl 
        flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleUploadClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedTypes}
          onChange={handleFileChange}
        />
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500">
          Supported formats: {acceptedTypes.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")}
        </p>
        {fileName && (
          <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm flex items-center">
            <FileType className="h-4 w-4 mr-2" />
            <span className="font-medium">{fileName}</span>
          </div>
        )}
      </div>
      <Button 
        onClick={handleUploadClick} 
        disabled={isLoading}
        className="w-full max-w-xl"
      >
        {isLoading ? "Processing..." : "Upload File"}
      </Button>
    </div>
  );
};

export default FileUpload;
