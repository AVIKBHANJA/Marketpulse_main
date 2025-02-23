const API_URL = 'http://localhost:8000';

// Advisor request must include company
export const analyzeStock = async (company, date) => {
  if (!company) throw new Error("Company symbol is required");
  
  const response = await fetch(`${API_URL}/advisor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      company: company.trim().toUpperCase(),  // Clean input
      date: date || new Date().toISOString().split('T')[0],  // Default to today
      userQuery: `${company} stock analysis`
    }),
  });
  return response.json();
};

export const basicQuery = async (userQuery) => {
  const response = await fetch(`${API_URL}/basic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_query: userQuery
    }),
  });
  return response.json();
};

