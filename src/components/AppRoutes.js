import { Routes, Route } from "react-router-dom";

import SignIn from '../pages/SignIn';
import RequireAuth from './RequireAuth';
import Landing from '../pages/Landing';
import SignUp from '../pages/SignUp';
import Recipes from '../pages/Recipes';
import MealPlans from '../pages/MealPlans';
import SignOut from '../pages/SignOut';
import Home from '../pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={
        <RequireAuth>
          <Home />
        </RequireAuth>
        }
      />
      <Route path="/recipes" element={
        <RequireAuth>
          <Recipes />
        </RequireAuth>
        }
      />
      <Route path="/meal-plans" element={
        <RequireAuth>
          <MealPlans />
        </RequireAuth>
        }
      />
      <Route path="/meal-plans" element={
        <RequireAuth>
          <MealPlans />
        </RequireAuth>
        }
      />
      <Route path="/signout" element={
        <RequireAuth>
          <SignOut />
        </RequireAuth>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
