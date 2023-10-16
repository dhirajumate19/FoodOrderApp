import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealsItem from "./MealItem/MealsItem";
import classess from "./MealsAvailable.module.css";
const DUMMY_MEALS = [];

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-order-app-8fb01-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong while fetcging data");
      }
      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };
    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classess.mealsLoading}>
        <p>Loading ....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classess.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealList = meals.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classess.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
export default MealsAvailable;
