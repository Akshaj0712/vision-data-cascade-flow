
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import DataDisplay from "@/components/DataDisplay";
import RowSelector from "@/components/RowSelector";
import { processCsvXlsx, processText, processRowSelection } from "@/services/pythonService";
import { mockCsvData, mockMatrix, mockImages } from "@/mocks/mockData";

const Index = () => {
  // First function state
  const [function1Results, setFunction1Results] = useState<{
    images: string[];
    data: any[] | null;
  }>({
    images: [],
    data: null,
  });

  // Second function state
  const [function2Results, setFunction2Results] = useState<{
    matrix: any[][] | null;
  }>({
    matrix: null,
  });

  // Third function state
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [function3Results, setFunction3Results] = useState<{
    image: string | null;
  }>({
    image: null,
  });

  // Handlers for each function
  const handleFileProcess = async (file: File) => {
    try {
      const result = await processCsvXlsx(file);
      setFunction1Results(result);
    } catch (error) {
      console.error("Error processing file:", error);
      // For demo purposes, use mock data
      setFunction1Results({
        images: mockImages,
        data: mockCsvData,
      });
    }
  };

  const handleTextProcess = async (text: string) => {
    try {
      const result = await processText(text);
      setFunction2Results(result);
    } catch (error) {
      console.error("Error processing text:", error);
      // For demo purposes, use mock data
      setFunction2Results({
        matrix: mockMatrix,
      });
    }
  };

  const handleDataUpload = (data: any[]) => {
    setUploadedData(data);
  };

  const handleRowSelect = async (row: any) => {
    try {
      const result = await processRowSelection(row);
      setFunction3Results(result);
    } catch (error) {
      console.error("Error processing row selection:", error);
      // For demo purposes, use mock image
      setFunction3Results({
        image: mockImages[0],
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Data Processing Dashboard</h1>
      
      <Tabs defaultValue="function1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="function1">File Processing</TabsTrigger>
          <TabsTrigger value="function2">Text Analysis</TabsTrigger>
          <TabsTrigger value="function3">Row Selection</TabsTrigger>
        </TabsList>

        {/* Function 1: File Upload and Display */}
        <TabsContent value="function1">
          <Card>
            <CardHeader>
              <CardTitle>File Processing</CardTitle>
              <CardDescription>
                Upload a CSV or XLSX file to analyze and visualize the results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload onFileUploaded={handleFileProcess} acceptedTypes=".csv,.xlsx" />
              
              {function1Results.images.length > 0 || function1Results.data ? (
                <DataDisplay 
                  images={function1Results.images} 
                  data={function1Results.data} 
                  title="Processing Results" 
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  Results will appear here after processing
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Function 2: Text Input and Matrix Display */}
        <TabsContent value="function2">
          <Card>
            <CardHeader>
              <CardTitle>Text Analysis</CardTitle>
              <CardDescription>
                Enter a text phrase to analyze and see the resulting matrix.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TextInput onTextSubmit={handleTextProcess} />
              
              {function2Results.matrix ? (
                <DataDisplay 
                  matrix={function2Results.matrix} 
                  title="Matrix Results" 
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  Matrix results will appear here after processing
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Function 3: Row Selection */}
        <TabsContent value="function3">
          <Card>
            <CardHeader>
              <CardTitle>Row Selection</CardTitle>
              <CardDescription>
                Upload a CSV or XLSX file, select a row, and view the result.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload 
                onFileUploaded={(file) => {}} 
                onDataParsed={handleDataUpload}
                acceptedTypes=".csv,.xlsx" 
              />
              
              {uploadedData ? (
                <div className="space-y-6">
                  <RowSelector data={uploadedData} onRowSelect={handleRowSelect} />
                  
                  {function3Results.image && (
                    <DataDisplay 
                      images={[function3Results.image]} 
                      title="Processing Result" 
                    />
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  Upload a file to select rows
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
