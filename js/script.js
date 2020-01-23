$(document).ready(function () {
    var showMore = $('.steps-item__text__content');
    for (var i = 0; i < showMore.length; i++) {
        var iHeight = showMore[i].offsetHeight;
        var count = Math.round($(showMore)[i].offsetHeight / parseInt($(showMore).css('line-height'), 10))
        console.log(count)
        if (count > 4) {
            $(showMore[i]).siblings('.steps-item__text__show').css({'display': 'block'})
        }
    }
    $('.parts__pin').mousemove(function (e) {
        var X = e.pageX;
        var Y = e.pageY;
        var top = Y + 'px';
        var left = X + 'px';
        var id = $(this).data('tooltip');
        $('#tip-' + id).css({
            display: "block",
            top: top,
            left: left
        });
    });
    $('.parts__pin').mouseout(function () {
        var id = $(this).data('tooltip');
        $('#tip-' + id).css({
            display: "none"
        });
    });
    $(".gallery-wrap__item").fancybox({
        helpers: {
            title: {
                type: 'float',
                padding: 0
            },
            padding: 0
        }
    });

    var url = 'ajax.php';
    $('.gallery__more').click(function () {
        $.get(url, function (data) {
            var new_div = $(data).css({'display': 'none'});
            $('.gallery-wrap').append(new_div);
            new_div.fadeIn(400);
        });
    });
    Node.prototype.getPosition = function (isCenter) {
        var left = 0;
        var top = 0;
        var e = this;

        if (isCenter == true) {
            console.log("center")
            left = e.offsetWidth / 2;
            top = e.offsetWidth / 2;
        }

        /*Tant que l'on a un élément parent*/
        while (e.offsetParent != undefined && e.offsetParent != null) {
            /*On ajoute la position de l'élément parent*/
            left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return {
            x: left,
            y: top
        };
    }
    SplitPicture = {
        calcPosition: function (rank, positionCursor) {
            var position = this.els[rank].getPosition();
            this.elsContent[rank].currentWidth = 100 - Math.floor((positionCursor.clientX - position.x) / this.elsContent[rank].width * 100);
            this.elsContent[rank].right.style.width = this.elsContent[rank].currentWidth + "%";
        },
        initEvent: function (el, rank) {
            var self = this;
            el.addEventListener("mouseenter", function () {
                self.elsContent[rank].isActive = true;
            }, false)
            el.addEventListener("mouseleave", function () {
                self.elsContent[rank].isActive = false;
                var el = self.elsContent[rank];
                if (el.currentWidth > 90) {
                    el.currentWidth = 100;
                    el.right.style.width = el.currentWidth + "%";
                } else if (el.currentWidth < 10) {
                    el.currentWidth = 0;
                    el.right.style.width = el.currentWidth + "%";
                }
            }, false)
            el.addEventListener("mousemove", function (e) {
                self.calcPosition(rank, e);
            }, false)
        },
        initEvents: function () {
            var self = this;
            for (i = 0; i < this.els.length; i++) {
                this.initEvent(this.els[i], i);
            }
        },
        init: function () {
            this.els = document.getElementsByClassName("split-picture");
            this.elsContent = [];
            for (i = 0; i < this.els.length; i++) {
                this.elsContent.push({
                    width: this.els[i].offsetWidth,
                    right: this.els[i].getElementsByClassName("picture-right")[0],
                    isActive: false
                })
            }
            this.initEvents();
        }
    }
    SplitPicture.init();




    $('.sert_gallery').slick({
        slidesToShow: 5,
        prevArrow: '<button class="arrow icon-chevron-left"></button>',
        nextArrow: '<button class="arrow icon-chevron-right"></button>',
        responsive: [
            {
                breakpoint: 1476,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1026,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 484,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    })



    var showMore = $('.steps-item__text__content');
    for (var i = 0; i < showMore.length; i++) {
        var iHeight = showMore[i].offsetHeight;
        var count = Math.round($(showMore)[i].offsetHeight / parseInt($(showMore).css('line-height'), 10))
        console.log(count)
        if (count > 4) {
            $(showMore[i]).siblings('.steps-item__text__show').css({'display': 'block'})
        }
    }
    $('.steps-item__text__show').click(function () {
        $(this).siblings(showMore).css({
            '-webkit-line-clamp': 'initial',
        })
        $(this).css({'display': "none"});
    })
    $('#quiz_button').hover(function () {
        $('#present_shake').toggleClass('shake');
    })
    $('#quiz_button').click(function () {
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 1000); // анимируем скроолинг к элементу scroll_el
            $.fancybox.close();
            return false
        }
    })

    //popups
    $('.order-trigger').click(function () {
        $.fancybox.open({
            src: '.popup--order',
            type: 'inline',
            opts: {
                onComplete: function () {
                    console.info('done!');
                },
                touch: false
            },
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 500,
            'speedOut': 300,
            hideOnOverlayClick: true,
            centerOnScroll: true,
            padding: 0, //убираем отступ
            helpers: {
                overlay: {
                    locked: false // отключаем блокировку overlay
                }
            }
        });
    });
    $('.offer-trigger').click(function () {
        $.fancybox.open({
            src: '.popup--offer',
            type: 'inline',
            opts: {
                onComplete: function () {
                    console.info('done!');
                },
                touch: false
            },
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 500,
            'speedOut': 300,
            hideOnOverlayClick: true,
            centerOnScroll: true,
            padding: 0, //убираем отступ
            helpers: {
                overlay: {
                    locked: false // отключаем блокировку overlay
                }
            }
        });
    });
    $('.consult-trigger').click(function () {
        $.fancybox.open({
            src: '.popup--consult',
            type: 'inline',
            opts: {
                onComplete: function () {
                    console.info('done!');
                },
                touch: false
            },
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 500,
            'speedOut': 300,
            hideOnOverlayClick: true,
            centerOnScroll: true,
            padding: 0, //убираем отступ
            helpers: {
                overlay: {
                    locked: false // отключаем блокировку overlay
                }
            }
        });
    })
    $('form').submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function () {
            $.fancybox.close();
            // код после успешной отправки формы
            $.fancybox.open({
                src: '.popup--thanks',
                type: 'inline',
                opts: {
                    onComplete: function () {
                        console.info('done!');
                    }
                },
                'transitionIn': 'elastic',
                'transitionOut': 'elastic',
                'speedIn': 500,
                'speedOut': 300,
                hideOnOverlayClick: true,
                padding: 0, //убираем отступ
                helpers: {
                    overlay: {
                        locked: false // отключаем блокировку overlay
                    }
                }
            });
            console.info('done!');
        });
        return false;
    });
    $("input[type='tel']").mask("+7 999-999-99-99");
});

