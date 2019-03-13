$(function() {
    $('.add-btn').click(function () {
        const $search = $('.search');
        const prod_name = $search.val();
        if (!prod_name) return;
        $search.val('');
        const $prod = create(prod_name);
        render($prod);
    });

    const $tomatoes = create('Tomatoes');
    render($tomatoes);
    const $coockies = create('Coockies');
    render($coockies);
    $coockies.find('.buy-button').click();
    const $cheese = create('Cheese');
    render($cheese);
});

function create(name) {
    const PROD_TEMPLATE = $('#prod-template');
    const $prod = PROD_TEMPLATE.clone();
    let quantity = 1;

    $prod.removeAttr("id");
    $prod.removeAttr("style");
    $prod.find('.prod-name').text(name);
    $prod.find('.quantity-input').val(quantity);
    $prod.find('.unbuy-button').hide();

    $prod.find('.circular-minus-button').click(function () {
        if (quantity <= 1) return;
        $prod.find('.quantity-input').val(--quantity);
        $prod.find('.count').val(quantity);
    });


    $prod.find('.circular-plus-button').click(function () {
        $prod.find('.quantity-input').val(++quantity);
    });

    $prod.find('.buy-button').click(function () {
        $prod.find('.circular-minus-button').hide();
        $prod.find('.circular-plus-button').hide();
        $prod.find('.buy-button').hide();
        $prod.find('.delete-button').hide();
        $prod.find(".prod-name").css("text-decoration-line", "line-through");
        $prod.find('.quantity-input').prop('disabled', true);

        $prod.find('.unbuy-button').show();
    });
    $prod.find('.delete-button').click(function () {
        $prod.hide();
    });

    $prod.find('.unbuy-button').click(function () {
        $prod.find('.circular-minus-button').show();
        $prod.find('.circular-plus-button').show();
        $prod.find('.buy-button').show();
        $prod.find('.delete-button').show();
        $prod.find(".prod-name").css("text-decoration-line", "none");
        $prod.find('.quantity-input').prop('disabled', false);

        $prod.find('.unbuy-button').hide();
    });

    return $prod;
}

function render($prod) {
    $('.container .left').append($prod);
    $prod.show();
}
