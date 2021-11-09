
const baseUrl = 'https://api.spoonacular.com/';
const apiKey = '3fb679886d3743a58954121d8077797f';

let view = 'list';
let recipes = [];

function getRecipes(params = {}) {

    const data = Object.assign({}, params, {apiKey: apiKey})
    const route ='recipes/complexSearch'
    $.ajax({
        method: "GET",
        url: `${baseUrl}${route}`,
        data,
    })

    .done(response => {
       recipes = response.results;
       renderRecipeList();
    })
 
    .fail(response => {
        console.log(response);
    })

    .always(() => {
        console.log('ajax completed');
    })
}

function renderRecipeList(){
    $recipesList = $('#recipes-list');
    $recipesList.empty();

    recipes.forEach(recipe => {
        const $template = getRecipeTemplate(recipe);
        $recipesList.append($template);
    })
}

function getRecipeTemplate(recipe) {
    const templateSelect = `#recipe-template-${view}`;
    const $template = $($(templateSelect).html());
    $template.find('.recipe-title').text(recipe.title);
    $template.find('.recipe-image').attr('src', recipe.image);
    $template.find('.recipe-description').text(recipe.description);
   return $template;
}



$('#get-recipes').click(()=> {
    const sort = $('#filter-sort').val();
    const type = $('#filter-types').val();
    const cuisines = [];
    const diets = [];

    $('.cuisine:checked').each((index, el) => {
        cuisines.push(el.id);
    })
    
    const cuisine = cuisines.join();

    $('.diet:checked').each((index, elm) => {
        diets.push(elm.id);
    })
    
    const diet = diets.join();

    getRecipes({
        sort,
        type,
        cuisine,
        diet,
    })
})



$('#grid-view').click((el) => {
    view = 'grid';
    $(el.currentTarget).addClass('btn-success').removeClass('btn-outline-success');
    $('#list-view').addClass('btn-outline-success').removeClass('btn-success');
    renderRecipeList();
})

$('#list-view').click((el) => {
    view = 'list';
    $(el.currentTarget).addClass('btn-success').removeClass('btn-outline-success');
    $('#grid-view').addClass('btn-outline-success').removeClass('btn-success');
    renderRecipeList();
})


getRecipes({
    type: 'appetizers',
})
