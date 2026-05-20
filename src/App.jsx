import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Market from "./Market/Market";
import Dashboard from "./Dashboard/Dashboard";
import Asset from "./Wallet/Asset/Asset";
import Deposit from "./Wallet/Deposit/Deposit";
import Withdraw from "./Wallet/Withdraw/Withdraw";

export default function App(){
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/market" element={<Market />} />
          <Route path="/wallet/asset" element={<Asset />} />
          <Route path="/wallet/deposit" element={<Deposit />} />
          <Route path="/wallet/withdraw" element={<Withdraw />} />
        </Routes>




    </Router>
  )

}