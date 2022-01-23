import {
  Container,
  List,
  ListSubheader,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCategories } from "../../service";
import CategoryItem from "../../components/CategoryItem";

const _categories = [
  { name: "category 1", slug: "category-1", active: true },
  { name: "category 2", slug: "category-2", active: false },
  { name: "category 3", slug: "category-3", active: true },
  { name: "category 4", slug: "category-4", active: false },
];

export default function PreferencesPage() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        if (res.statusCode === 200) {
          setCategories(res.data.categories);
        } else {
          alert(
            "Something went Wrong. Please contact the system Admin and show this code: 1006"
          );
        }
      })
      .catch(() => {
        setCategories(_categories); // to remove after live
        alert(
          "Something went Wrong. Please contact the system Admin and show this code: 1007"
        );
      });
  }, []);

  return (
    <Container>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>Categories</ListSubheader>}
      >
        {categories.map((category) => {
          return (
            <CategoryItem
                key={category.slug}
                item={category}
            />
          );
        })}
      </List>
    </Container>
  );
}
