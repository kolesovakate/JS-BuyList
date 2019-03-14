$(function() {
    const $search = $('.search');
    const $add_btn = $('.add-btn');
    $search.keypress(function (e) {
        if (e.which === 13) {
            $add_btn.click();
        }
    });
    $add_btn.click(function () {
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
    // $coockies.find('.buy-button').click();
    const $cheese = create('Cheese');
    render($cheese);
});

function create(name) {
    const PROD_TEMPLATE = $('#prod-template');
    const PROD_COUNT_TEMPLATE = $('#prodCount-template');

    const $prod = PROD_TEMPLATE.clone();
    let quantity = 1;

    const $prodC1 = PROD_COUNT_TEMPLATE.clone();
    $prodC1.removeAttr("id");
    $prodC1.removeAttr("style");
    $prodC1.find('.title').text(name);
    $prodC1.find('.count').text(quantity);
    const $prodC2 = $prodC1.clone();
    $prodC2.css("text-decoration-line", "line-through");

    $prod.removeAttr("id");
    $prod.removeAttr("style");
    $prod.find('.prod-name').text(name);
    $prod.find('.quantity-input').val(quantity);
    $prod.find('.unbuy-button').hide();

    const $count = $prod.find('.quantity-input');
    $count.keypress(function (e) {
        if (e.which !== 13) return;
        const quantity1 = $count.val();
        if (quantity1 <= 0) {
            $count.val(quantity);
            return false;
        }
        quantity = quantity1;
        $prod.find('.quantity-input').val(quantity);
        $prodC1.find('.count').text(quantity);
        $prodC2.find('.count').text(quantity);
        return false;
    });

    $prod.find('.circular-minus-button').click(function () {
        if (quantity <= 1) return;
        $prod.find('.quantity-input').val(--quantity);
        $prodC1.find('.count').text(quantity);
        $prodC2.find('.count').text(quantity);
    });


    $prod.find('.circular-plus-button').click(function () {
        $prod.find('.quantity-input').val(++quantity);
        $prodC1.find('.count').text(quantity);
        $prodC2.find('.count').text(quantity);
    });

    $prod.find('.buy-button').click(function () {
        $prod.find('.circular-minus-button').hide();
        $prod.find('.circular-plus-button').hide();
        $prod.find('.buy-button').hide();
        $prod.find('.delete-button').hide();
        $prod.find(".prod-name").css("text-decoration-line", "line-through");
        $prod.find('.quantity-input').prop('disabled', true);
        $prodC1.hide();

        $prod.find('.unbuy-button').show();
        $prodC2.show();
    });
    $prod.find('.delete-button').click(function () {
        $prod.hide();
        $prodC1.hide();
        $prodC2.hide();
    });

    $prod.find('.unbuy-button').click(function () {
        $prod.find('.circular-minus-button').show();
        $prod.find('.circular-plus-button').show();
        $prod.find('.buy-button').show();
        $prod.find('.delete-button').show();
        $prod.find(".prod-name").css("text-decoration-line", "none");
        $prod.find('.quantity-input').prop('disabled', false);
        $prodC1.show();

        $prod.find('.unbuy-button').hide();
        $prodC2.hide();
    });

    return {
        "prod": $prod,
        "c1": $prodC1,
        "c2": $prodC2
    };
}

function render($prod) {
    $('.container .left').append($prod.prod);
    $('.label-list').append($prod.c1);
    $('.label-bought-list').append($prod.c2);
    $prod.prod.show();
    $prod.c1.show();
    $prod.c2.hide();
}
