function App() {
  return (
    <Router>
      <Navigation /> {/* Add Navigation component here */}
      <Routes>
        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Other Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
