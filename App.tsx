
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DiffInput } from './components/DiffInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeDiff } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const exampleDiff = `--- a/app/login.py
+++ b/app/login.py
@@
 def authenticate(user, password):
-    if user.is_admin == False:
-        grant_access()
+    if user.is_admin:
+        grant_access()
     if password == "12345":
         print("DEBUG: weak password used")
         db.save_login(user)
         
--- a/config.js
+++ b/config.js
@@
-const API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
+const API_KEY = process.env.API_KEY;
 const DB_URL = "user:password@db.example.com/prod";
 
 function connect() {
   // ...
 }`;

  const handleAnalyze = useCallback(async (diffText: string) => {
    if (!diffText.trim()) {
      setError("Please paste a code diff to analyze.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeDiff(diffText);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError("Failed to analyze the diff. Please check the console for more details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DiffInput onAnalyze={handleAnalyze} isLoading={isLoading} exampleDiff={exampleDiff} />
        {error && <div className="mt-6 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg text-center">{error}</div>}
        <ResultsDisplay result={analysisResult} isLoading={isLoading} />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>AI Pull Request Reviewer PoC</p>
      </footer>
    </div>
  );
};

export default App;
