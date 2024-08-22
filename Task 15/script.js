// Function to save a recipe
function saveRecipe(recipe) {
  let savedRecipes = JSON.parse(sessionStorage.getItem("savedRecipes")) || [];
  if (!savedRecipes.some((r) => r.url === recipe)) {
    savedRecipes.push({ url: recipe, likes: 0 });
    sessionStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    displaySavedRecipes();
    alert(`You have ${savedRecipes.length} saved recipes.`);
  }
}

// Function to display saved recipes
function displaySavedRecipes() {
  const savedRecipes = JSON.parse(sessionStorage.getItem("savedRecipes")) || [];
  const savedRecipesList = document.getElementById("saved-recipes");
  savedRecipesList.innerHTML = "";
  savedRecipes.forEach((recipe) => {
    let li = document.createElement("li");
    li.innerHTML = `<a href="${recipe.url}">${recipe.url.replace("#", "")}</a>
                    <form onsubmit="likeRecipe('${recipe.url}'); return false;">
                      <input type="submit" value="Like (${recipe.likes})" />
                    </form>`;
    savedRecipesList.appendChild(li);
  });
}

// Function to like a recipe
function likeRecipe(recipeUrl) {
  let savedRecipes = JSON.parse(sessionStorage.getItem("savedRecipes")) || [];
  savedRecipes = savedRecipes.map((recipe) => {
    if (recipe.url === recipeUrl) {
      recipe.likes += 1;
    }
    return recipe;
  });
  sessionStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  displaySavedRecipes();
}

// Event listeners for save buttons
document.querySelectorAll(".save-btn").forEach((button) => {
  button.addEventListener("click", () => {
    let recipe = button.getAttribute("data-recipe");
    saveRecipe(recipe);
  });
});

$(document).ready(function () {
  // Toggle testimonial visibility
  $("#toggle-testimonial").click(function () {
    $(".testimonial").toggle();
    $(this).text(function (i, text) {
      return text === "Show Testimonial"
        ? "Hide Testimonial"
        : "Show Testimonial";
    });
  });

  // Chained animation for images on page load
  $(".recipe-img").each(function (index) {
    $(this)
      .delay(index * 500)
      .animate(
        { opacity: 1, transform: "scale(1)" },
        {
          duration: 1000,
          step: function (now, fx) {
            if (fx.prop === "transform") {
              $(this).css("transform", `scale(${now})`);
            }
          },
        }
      );
  });
});

// Display saved recipes on page load
document.addEventListener("DOMContentLoaded", displaySavedRecipes);
