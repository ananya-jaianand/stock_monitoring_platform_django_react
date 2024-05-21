// DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';

interface WatchlistItem {
  id: number;
  symbol: string;
  price?: number; 
  volume?: number;
}

var status=0;
const DashboardPage: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [symbolToAdd, setSymbolToAdd] = useState('');
  const [symbols, setSymbols] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWatchlist();
    fetchSymbols();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/watchlists/view/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data: WatchlistItem[] = await response.json();
        if (!Array.isArray(data)) {
          setWatchlist([]);
        } else {
          const updatedWatchlist = await Promise.all(
            data.map(async (item) => {
              const stockData = await fetchStockData(item.symbol);
              return { ...item, ...stockData };
            })
          );
          console.log(updatedWatchlist);
          setWatchlist(updatedWatchlist);
        }
      }
     else if (response.status === 401) {
      handleTokenExpiry();
     }
      else {
        setError('Failed to fetch watchlist data.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (status === 201) {
        setError('Your watchlist is empty.');
       }
      setError('An error occurred. Please try again later.');
    }
  };

  const handleTokenExpiry = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page or show a login modal
    window.location.href = '/'; // or set a state to show login modal
  };



  // const fetchStockData = async (symbol: string) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/stocks/data/${symbol}/`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data)
  //       return { price: parseFloat(data.price), volume: parseInt(data.volume) };
  //     } else {
  //       return { price: 0, volume: 0 };
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return { price: 0, volume: 0 };
  //   }
  // };

  const fetchStockData = async (symbol: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/stocks/data/${symbol}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return { price: parseFloat(data.price), volume: parseInt(data.volume) };
      } else {
        return { price: 0, volume: 0 };
      }
    } catch (error) {
      console.error('Error:', error);
      return { price: 0, volume: 0 };
    }
  };


  const fetchSymbols = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/stocks/data/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.symbols);
        setSymbols(data.symbols);
      } else {
        setError('Failed to fetch symbols data.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  // const handleAddSymbol = async (symbolToAdd: string) => {
  //   try {
  //     const response = await fetch('http://localhost:8000/api/watchlists/add-symbol/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //       body: JSON.stringify({ symbol: symbolToAdd }),
  //     });
  //     if (response.ok) {
  //       fetchWatchlist();
  //       setSymbolToAdd('');
  //     } else {
  //       setError('Failed to add symbol to watchlist.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setError('An error occurred. Please try again later.');
  //   }
  // };

  const handleAddSymbol = async (symbolToAdd: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/watchlists/add-symbol/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ symbol: symbolToAdd }),
      });
      if (response.ok) {
        fetchWatchlist();
        setSymbolToAdd('');
      } 
      else {
        setError('Failed to add symbol to watchlist.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleDeleteSymbol = async (symbol: string) => {
    try {
        const response = await fetch(`http://localhost:8000/api/watchlists/delete/${symbol}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            fetchWatchlist();
        } else {
            setError('Failed to delete symbol from watchlist.');
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
    }
};


  return (
  
    <Container component="main" maxWidth="md">
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
       <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}
    >
      <Typography component="h1" variant="h4" gutterBottom sx={{ marginRight: 70 }}>
        Dashboard
      </Typography>
      <Button
        variant="outlined"
        onClick={handleTokenExpiry}
      >
        Logout
      </Button>
    </Box>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ width: '100%', marginTop: 4 }}>
        <Typography component="h2" variant="h5" gutterBottom>
          Add Symbol
        </Typography>
        <Select
          value={symbolToAdd}
          onChange={(e) => setSymbolToAdd(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">Select Symbol</MenuItem>
          {symbols.map((symbol) => (
            <MenuItem key={symbol} value={symbol}>{symbol}</MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddSymbol(symbolToAdd)}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add
        </Button>
      </Box>

      <Box sx={{ width: '100%', marginTop: 4 }}>
        <Typography component="h2" variant="h5" gutterBottom>
          Watchlist
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlist.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.symbol}</TableCell>
                  <TableCell>{item.price?.toFixed(2)}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteSymbol(item.symbol)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      

     
    </Box>
  </Container>
  );
};

export default DashboardPage;
