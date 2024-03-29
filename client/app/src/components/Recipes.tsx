import React, { Suspense } from "react";

const RecipesMFE = React.lazy(() => import("recipes/App"));

const Recipes: React.FC = () => {
  return (
    <Suspense fallback={<span>Carregando...</span>}>
      <RecipesMFE />
    </Suspense>
  );
};

export default Recipes;
