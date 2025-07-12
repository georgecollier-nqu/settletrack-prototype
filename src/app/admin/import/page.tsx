"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Info,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type ImportStatus = "idle" | "uploading" | "processing" | "complete" | "error";

interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
}

export default function AdminImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pasteContent, setPasteContent] = useState("");
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPasteContent(""); // Clear paste content when file is selected
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleImport = async () => {
    setStatus("uploading");
    setProgress(20);

    // Simulate upload
    setTimeout(() => {
      setStatus("processing");
      setProgress(50);

      // Simulate processing
      setTimeout(() => {
        setProgress(80);

        // Simulate completion
        setTimeout(() => {
          setStatus("complete");
          setProgress(100);
          setResult({
            total: 150,
            successful: 143,
            failed: 7,
            errors: [
              "Row 23: Invalid case ID format",
              "Row 45: Missing court district",
              "Row 67: Duplicate case ID",
              "Row 89: Invalid court district 'N.D.XX'",
              "Row 101: Case ID already exists in database",
              "Row 125: Invalid date format",
              "Row 142: Missing required fields",
            ],
          });
        }, 1000);
      }, 2000);
    }, 1000);
  };

  const handleReset = () => {
    setFile(null);
    setPasteContent("");
    setStatus("idle");
    setProgress(0);
    setResult(null);
  };

  const downloadTemplate = () => {
    // In a real app, this would download a CSV template
    alert("Downloading CSV template...");
  };

  const canImport = (file || pasteContent) && status === "idle";

  return (
    <div className="flex-1 overflow-hidden">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-2xl font-serif font-bold">Import Cases</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadTemplate}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Template
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-muted/30 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Instructions */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Import case IDs and court districts via CSV file or paste
              directly. Format: &quot;case_id,court_district&quot; (one per
              line). Example: &quot;1:2024cv04221,S.D.N.Y.&quot;
            </AlertDescription>
          </Alert>

          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Import Method</CardTitle>
              <CardDescription>
                Choose to upload a CSV file or paste case data directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-4">
                <Label htmlFor="file-upload">Upload CSV File</Label>
                {!file ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="sr-only"
                      disabled={status !== "idle"}
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Click to upload CSV file
                      </span>
                      <span className="text-xs text-muted-foreground">
                        or drag and drop
                      </span>
                    </Label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      disabled={status !== "idle"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {/* Paste Area */}
              <div className="space-y-2">
                <Label htmlFor="paste-content">
                  Paste Case IDs and Court Districts
                </Label>
                <Textarea
                  id="paste-content"
                  placeholder="1:2024cv04221,S.D.N.Y.
4:2023cv05710,N.D.Cal.
2:2024cv00123,E.D.Tex."
                  value={pasteContent}
                  onChange={(e) => {
                    setPasteContent(e.target.value);
                    setFile(null); // Clear file when pasting
                  }}
                  disabled={status !== "idle"}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  One case per line, comma-separated
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleImport}
                  disabled={!canImport || status !== "idle"}
                  className="gap-2"
                >
                  {status === "idle" && (
                    <>
                      <Upload className="h-4 w-4" />
                      Start Import
                    </>
                  )}
                  {status === "uploading" && (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  )}
                  {status === "processing" && (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  )}
                  {status === "complete" && (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Complete
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      Error
                    </>
                  )}
                </Button>
                {status !== "idle" && (
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          {status !== "idle" && (
            <Card>
              <CardHeader>
                <CardTitle>Import Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress}% complete
                </p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Import Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{result.total}</p>
                    <p className="text-sm text-muted-foreground">Total Cases</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-600">
                      {result.successful}
                    </p>
                    <p className="text-sm text-muted-foreground">Successful</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <p className="text-2xl font-bold text-red-600">
                      {result.failed}
                    </p>
                    <p className="text-sm text-muted-foreground">Failed</p>
                  </div>
                </div>

                {result.errors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      Import Errors
                    </h4>
                    <div className="space-y-1">
                      {result.errors.map((error, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground p-2 bg-muted/30 rounded"
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
