/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      try {
        const errData = await response.json();
        if (errData && errData.text) {
          return errData.text;
        }
      } catch (e) {
        // ignore JSON parsing errors for non-JSON error responses
      }
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini client-side proxy error:", error);
    return "Signal lost. XETA AI is currently offline.";
  }
};
