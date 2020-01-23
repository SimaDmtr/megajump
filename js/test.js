$(function () {
    /**
     * Настройка слайдера
     *
     * Подробная информация:
     * http://kenwheeler.github.io/slick/#settings
     */
    var testSliderOptions = {
        arrows: false,
        dots: false,
        draggable: false,
        infinite: false,
        swipe: false,
        name: 'mainSlider',
        adaptiveHeight: true,
        fade: true,
        cssEase: 'linear'
    }

    var innerSliderOptions = {
        dots: false,
        slidesToShow: 4,
        infinite: false,
        adaptiveHeight: true,
        // Настройка слайдера на разрешение экрана, чем меньше экран
        // тем меньше слайдов на одном слайдере
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    }
    $('.next-test-empty').click(function (e) {
        e.preventDefault()
        $testSlider.slick('slickNext');
    })
    // Инициализируем наш слайдер с нашими тестами
    var $testSlider = $(".test-slider");
    $testSlider.slick(testSliderOptions); // Инициализируем сам слайдер


    // var innerSlider = $(".inner-form-slider").slick(innerSliderOptions);
    // Узнаём длину слайдера для прогрес бара
    var $testSliderItem = $(".test-slider .test-slider__item");
    var testSliderLength = $testSliderItem.length;

    // Это кнопка позволяющая переключиться на следующий тест
    var $nextTestButton = $(".next-test");
    var $prevTestButton = $(".prev-test");
    // Изначально отключаем все кнопки
    $nextTestButton.prop('disabled', true);
    // Вызываем функцию изменения прогресс бара по умолчанию 0
    changeProgressBar(0);
    checkInputValidation(0);


    // последний слайд
    $('.test-slider__form input').on('change, input, keyup', function (event) {
        if ($(this).attr('name') === 'name' && $(this).val().trim().length > 4) {
            $("input[name='name']").css({
                "border-bottom": '2px solid #e5e5e5',
            });

        } else if ($(this).attr('name') === 'phone' && $(this).val().length > 12) {
            $("input[name='phone']").css({
                "border-bottom": '2px solid #e5e5e5',
            });
        }
    });
    // var endPrice = 0;
    // По нажатию на кнопку переключиться на следующий слайд
    $('.stock-item__visible__right__link,.stock-item__visible__left__link').click(function () {
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 1000); // анимируем скроолинг к элементу scroll_el
            return false
        }
    });
    $nextTestButton.on('click', function (event) {
        $('.next-test').removeClass('next-test--active');
        $('.prev-test').removeClass('prev-test--active');

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#quiz_scroll").offset().top
        }, 800);

        if (!$(this).hasClass('submit') && !$(this).hasClass('end-btn')) {
            event.preventDefault();
            $testSlider.slick('slickNext');

        } else if ($(this).hasClass('submit')) {

            if ($(this).parents('.test-slider__item').find('.test-slider__form').find("input[name='name']").val().trim().length < 4
                && $(this).parents('.test-slider__item').find('.test-slider__form').find("input[name='phone']").val().trim().length < 13) {

                $("input[name='name']").css({
                    "border-bottom": '2px solid #f44336',
                });

                $("input[name='phone']").css({
                    "border-bottom": '2px solid #f44336',
                });

                $(".submit").attr({
                    "disabled": 'true',
                });

            } else if ($(this).parents('.test-slider__item').find('.test-slider__form').find("input[name='name']").val().trim().length < 4) {
                $("input[name='name']").css({
                    "border-bottom": '2px solid #f44336',
                });
            } else if ($(this).parents('.test-slider__item').find('.test-slider__form').find("input[name='phone']").val().trim().length < 13) {
                $("input[name='phone']").css({
                    "border-bottom": '2px solid #f44336',
                });
            } else {
                $('.test-item__number-text').text("готово!");

            }

        } else if ($(this).hasClass('end-btn')) {
            event.preventDefault();
            $('.test-item__number-furst, .test-item__number-all').hide();
            $('.test-item__number-text').show();
            $testSlider.slick('slickNext');

        }
        // var sliderM = $(".test-slider");
        // var oneBlocH = $(".test-slider_item-end").outerHeight();
        // sliderM.css({"height": oneBlocH});
    });
    $prevTestButton.on('click', function (event) {
        event.preventDefault();

        changeProgressBar();
        $testSlider.slick('slickPrev');


    });

    $nextTestButton.keydown(function (event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            event.preventDefault();
            return false;
        }
    });

    /**
     * @param {Event} event Событие
     * @param {slick} slick Текущий слайдер над котором ведётся действие
     * @param {Number} oldIndex предыдущий индекс слайда
     * @param {Number} newIndex новый индекс слайда
     * Данная функция вызывается когда мы переключаемся на следующий слайд
     */
    function nextSlide(event, slick, oldIndex, newIndex) {
        if (slick.options.name === 'mainSlider') {
            changeProgressBar(newIndex);
            checkInputValidation(newIndex);
        }
    }

    $testSlider.on('beforeChange', nextSlide);

    /**
     *
     * @param {Number} currentIndex Текущий индекс слайдера
     *
     * Данная функция меняет шкалу прогресса в зависимости
     * на каком вопросе находится пользователь
     */
    var numberAll = $testSlider.slick('getSlick').slideCount;
    if (numberAll < 10) {
        numberAll = '0' + numberAll;
    } else {
        numberAll = numberAll;
    }
    $(".test-item__number-all").text('/ ' + numberAll);

    function changeProgressBar(currentIndex) {
        var elementNumber = currentIndex + 1;
        var percent = elementNumber * 100 / testSliderLength + "% выполнено";
        var $bar = $(".test-progress");
        $bar.text(percent);

        var lineClass = ".test-block"
        var circleClass = ".test-circle"
        var numberLine = $(lineClass + '-' + (currentIndex-1));
        var numberCircle = $(circleClass + '-' + (currentIndex ));
        var numbFirst;
        if (elementNumber < 10) {
            numbFirst = '0' + elementNumber;
        } else {
            numbFirst = elementNumber;
        }
        $(".test-item__number-furst").text(numbFirst);
        numberLine.addClass('test-block-active');
        numberCircle.addClass('test-circle-active');
        var numProc = $(".test__img-count");
        var price = $("#test__img-price");
        var numberAll = $testSlider.slick('getSlick').slideCount - 1;
        if (currentIndex === 0) {
            numProc.text(numberAll - 2 + " вопросов");
        } else if (currentIndex === 1) {
            numProc.text((numberAll - 3 + " вопросов"));
        } else if (currentIndex === 2) {
            numProc.text((numberAll - 4 + " вопроса"));
        } else if (currentIndex === 3) {
            numProc.text((numberAll - 5 + " вопроса"));
        } else if (currentIndex === 4) {
            numProc.text((numberAll - 5 + " вопроса"));
        } else if (currentIndex === 5) {
            numProc.text((numberAll - 6 + " вопроса"));
        } else  if (currentIndex === 6){
            numProc.text((numberAll - 7 + " вопрос"));
        }else  if (currentIndex === 7){
            numProc.text('Ваш подарок');
            $('.test__img-title').css({'display':'none'})
            document.getElementById('present_img').setAttribute('src','img/q_present.png')
        }else  if (currentIndex === 8){
            if($('#qn7_1:checked').length > 0){
                numProc.text('Скидка -10%');
                price.text('Цена: 2500 р')
            }else if($('#qn7_2:checked').length > 0){
                numProc.text('Бесплатная доставка');
                price.text('Цена: 2500 р')
            }else if($('#qn7_3:checked').length > 0){
                numProc.text('Насос');
                price.text('Цена: 2500 р')
            }else if($('#qn7_4:checked').length > 0){
                numProc.text('Пакет документов: \n' +
                    'Бизнес на батутах');
                price.text('Цена: 2500 р')
            }
            $('.test__img-title').css({'display':'block'}).text('Ваш подарок:');
            document.getElementById('present_img').setAttribute('src','img/present_big.png')

        }



    }


    /**
     *
     * @param {Number} index Индекс проверяемого теста
     *
     * Данная функция проверят ввёл ли пользователь данные
     * в поля ввода или выбрал тот или иной выбор или чекбокс
     */
    function checkInputValidation(index) {
        var $element = $testSliderItem.eq(index);
        var $elementInputs = $element.find("input, select, textarea");
        var $nextButton = $element.find("button.next-test:eq(0)");
        $elementInputs.on('change input', function (e) {
            var value = $(this).val().trim();
            var isValid = value !== "";
            $nextButton.prop('disabled', !isValid);

        });
        $(".ui-slider-handle").on("click, change, mouseenter", function () {
            var isValid = true;
            $nextButton.prop('disabled', !isValid);
        });
    }


    /**
     * Запрещаем ввод знаков 'e' и '+' в поле ввода для чисел
     */
    $("input[type='number']").on('keypress', function (e) {
        var kcd = e.keyCode;
        if (kcd === 43 || kcd === 101) return false;
    });

    /**
     *
     * @param {NodeSelector} $form принимает на себя форму
     *
     * Данная функция берет данные с формы и меняет его на
     * объект JS
     *
     */
    function getFormDataObject($form) {
        var seializedArray = $form.serializeArray();
        var formDataObject = {};
        $.map(seializedArray, function (n, i) {
            formDataObject[n['name']] = n['value'];
        });
        return formDataObject;
    }

});


//  test page

if ($("body").find(".test").length > 0) {

    // tooltip

    var tooltipWidth = $(".question-test").parents(".customRadio_label").outerWidth();
    var positionLeft,
        positionTop,
        toolBool = false,
        titleToolbox,
        subtitleToolbox,
        descrToolbox,
        priceToolbox;

    function tooltipShow() {
        toolBool = true;
        $(this).addClass('question-active');
        tooltipWidth = $(this).parents(".customRadio_label").outerWidth();

        positionLeft = Math.floor($(this).parents(".customRadio_label").offset().left);

        positionTop = Math.floor($(this).parents(".customRadio_label").offset().top + $(this).parents(".customRadio_label").outerHeight() + 5);


        titleToolbox = $(this).parents(".test-slider__elem").find(".data-hide__title").text().trim();
        subtitleToolbox = $(this).parents(".test-slider__elem").find(".data-hide__subtitle").text().trim();
        descrToolbox = $(this).parents(".test-slider__elem").find(".data-hide__descr").text().trim();
        priceToolbox = $(this).parents(".test-slider__elem").find(".data-hide__price").text().trim();

        $(".tooltip-test__title").text(titleToolbox);
        $(".tooltip-test__subtitle").text(subtitleToolbox);
        $(".tooltip-test__descr").text(descrToolbox);
        $(".tooltip-test__trigger").text(priceToolbox);

        toolIsShow();
    }

    function objTooltip() {
        if ($(window).width() > 991) {
            $(".question-test").hover(tooltipShow, function () {

                $(".tooltip-test").on("mouseenter", function () {
                    $(this).addClass('showTooltip');
                    toolBool = true;
                    toolIsShow();
                });

                setTimeout(function () {
                    if (!$(".tooltip-test").hasClass('showTooltip')) {
                        toolBool = false;
                        $(".question-test").removeClass('question-active');
                        toolIsShow();
                    }
                }, 150);


            });

        } else {
            $(".question-test").on("click", function () {
                if ($(this).hasClass('mobile-act')) {
                    $(".question-test").removeClass('mobile-act');
                    toolBool = false;
                    $(this).removeClass('showTooltip');
                    $(".question-test").removeClass('question-active');
                    toolIsShow();
                } else {
                    $(".question-test").removeClass('mobile-act');
                    $(this).addClass('mobile-act');
                    toolBool = true;
                    $(".question-test").removeClass('question-active');
                    $(this).addClass('question-active');
                    tooltipWidth = $(this).parents(".customRadio_label").outerWidth();

                    positionLeft = Math.floor($(this).parents(".customRadio_label").offset().left);

                    positionTop = Math.floor($(this).parents(".customRadio_label").offset().top + $(this).parents(".customRadio_label").outerHeight() + 5);


                    titleToolbox = $(this).parents(".test-slider__elem").find(".data-hide__title").text().trim();
                    subtitleToolbox = $(this).parents(".test-slider__elem").find(".data-hide__subtitle").text().trim();
                    descrToolbox = $(this).parents(".test-slider__elem").find(".data-hide__descr").text().trim();
                    priceToolbox = $(this).parents(".test-slider__elem").find(".data-hide__price").text().trim();

                    $(".tooltip-test__title").text(titleToolbox);
                    $(".tooltip-test__subtitle").text(subtitleToolbox);
                    $(".tooltip-test__descr").text(descrToolbox);
                    $(".tooltip-test__trigger").text(priceToolbox);

                    toolIsShow();
                }
            });
        }
    }


    objTooltip();


    function toolIsShow() {
        if (toolBool) {
            $(".tooltip-test").css({
                "width": tooltipWidth,
                "visibility": 'visible',
                "transform": 'translate(' + positionLeft + 'px,' + positionTop + 'px)',
                "opacity": '1',

            });
        } else {
            $(".tooltip-test").css({
                "visibility": 'hidden',
                "transform": 'translate(' + (positionLeft + getRandomInt(-100, 100)) + 'px,' + (positionTop + getRandomInt(-100, 100)) + 'px)',
                "opacity": '0',
            });
        }
    }


    $(".tooltip-test").on("mouseleave", function () {
        toolBool = false;
        $(this).removeClass('showTooltip');
        $(".question-test").removeClass('question-active');
        toolIsShow();
    });


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // slider
    $("#number-slider").slider({
        animate: "slow",
        range: "min",
        value: 70,
        max: 1000,
        slide: function (event, ui) {
            $("#send-result-polzunok").val(ui.value);
        }
    });
    $("#send-result-polzunok").val($("#number-slider").slider("value"));
    var crdVal;
    $("#send-result-polzunok").on('keyup', function (event) {
        crdVal = $('#send-result-polzunok').val().trim();

        if (parseInt(crdVal) > 1000) {
            $('#send-result-polzunok').val(1000);
        }

        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        $("#number-slider").slider("value", $(this).val());
    });

    $("#send-result-polzunok").on("change , input", function () {
        if (crdVal === '') {
            $('#send-result-polzunok').val(0);
        }
    });

    $("#no").on('change input', function () {
        if ($(this).prop('checked')) {

            $("#width,#height,#length").val("0").attr({'disabled': 'disabled'});
        } else {

            $("#width,#height,#length").removeAttr('disabled');
        }
    });
    var elems = $('.test-slider__elem-min,.test-slider__elem-big,.test-slider__elem,.test-slider__elem-radio');
    $(elems).click(function () {
        $(elems).removeClass('checked');
        $(this).addClass('checked');
        $(this).parents('.test-slider__item').find('.next-test').addClass('next-test--active');
        $(this).parents('.test-slider__item').find('.prev-test').addClass('prev-test--active');
        $(this).find('label')[0].click();
    })
    $('.customRadio_label-check').click(function () {
        $(this).parents('.test-slider__item').find('.next-test').toggleClass('next-test--active');
        $(this).parents('.test-slider__item').find('.prev-test').toggleClass('prev-test--active');
    })
    $('.test-slider__data__inputs_items_item_input').keyup(function () {
        $(this).parents('.test-slider__item').find('.next-test').addClass('next-test--active');
        $(this).parents('.test-slider__item').find('.prev-test').addClass('prev-test--active');
    })
}


