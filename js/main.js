jQuery(function ($) {
    /MSIE [6-8]|Mac/i.test(navigator.userAgent) || $("header, article, footer").each(function () {
        if ("fixed" === $(this).css("backgroundAttachment")) {
            let i = $(this), a = /WebKit/i.test(navigator.userAgent) ? 9 : 8;
            i.addClass("froid-fixed-bg").data({
                bgX: i.css("backgroundPosition").slice(0, i.css("backgroundPosition").indexOf(" ")),
                bgY: i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),
                margin: a
            })
        }
    });
    $(window).bind("SIModals.modalsOpen", function () {
        $(".froid-fixed-bg").each(function () {
            let i = $(this);
            i.css("backgroundPosition", "calc(" + i.data("bgX") + " - " + i.data("margin") + "px) " + i.data("bgY"))
        })
    });
    $(window).bind("SIModals.modalsClose", function () {
        $(".froid-fixed-bg").each(function () {
            let i = $(this);
            i.css("backgroundPosition", i.data("bgX") + " " + i.data("bgY"))
        })
    });
    if (is_mobile()) {
        $("header, section, article, footer, .section-bg-block::before").each(function () {
            if ("fixed" === $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');
        });
        function removeAnimation(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none',
                'transition': 'none',
                '-webkit-transition': 'none',
                'opacity': 1
            }).removeClass(className);
        }
        function removeTransform(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none'
            }).removeClass(className);
        }
        removeAnimation($('.cre-animate'), 'cre-animate');
        removeTransform($('.si-floating'), 'si-floating');
        removeTransform($('.si-floating2'), 'si-floating2');
        removeTransform($('.si-floating3'), 'si-floating3');
        removeTransform($('.si-floating4'), 'si-floating4');

        // Mobile stretch
        $('html').css('width', window.innerWidth + 'px');
        $(window).resize(function () {
           $('html').css('width', window.innerWidth + 'px');
        });
        $(window).bind('scroll', function () {
           $('html').css('width', window.innerWidth + 'px');
        });
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0
        });
    }
    else {
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0.3
        });
        $(document).on('mouseenter',
            '.btn, ' +
            '.si-close, ' +
            '.phone-link, ' +
            '.si-jump, ' +
            '.swiper-button-prev, ' +
            '.swiper-button-next, ' +
            '.swiper-pagination-bullet, ' +
            '.tab-link', function () {
                $.ionSound.play('bip-2');
            });
        SIModals.beforeOpen = function () {
            $.ionSound.play('wuf-4');
        };
        SIModals.beforeClose = function () {
            $.ionSound.play('wuf-3');
        };
        if (!navigator.userAgent.match(/Trident\/7\./)) { // if not IE
            SmoothScroll({stepSize: 100});
        } else {
            document.body.addEventListener("mousewheel", function (event) {
                event.preventDefault();
                let wd = event.wheelDelta;
                let csp = window.pageYOffset;
                window.scrollTo(0, csp - wd);
            });
        }

        // ===================================================== video bg
        //$('#video-bg').css({'visibility': 'visible'});
        //$('#video-bg')[0].play();
    }

    if (is_OSX()) {
        $('html, body').addClass('osx');
    }


    // ===================================================== Init all plugins and scripts
    $.fn.SIInit = function () {

        //Modal photos
        $("[data-fancybox]").fancybox({
            loop: true,
            thumbs: {
                autoStart: true
            },
            youtube: {},
            vimeo: {}
        });

        //Forms
        $('.send-form').SIForms({
            'validateFields': {
                'client_name': 'Ваше имя',
                'client_phone': 'Ваш телефон',
                'client_mail': 'Ваш e-mail'
            },
            'checkExtra': function (form) {
                if (!$(form).find('.form-agree-check').hasClass('checked')) {
                    SIPageMessages.show('Для отправки формы вы должны согласиться на обработку персональных данных.');
                    return false;
                }
				if ($(form).find('input').hasClass('si-error')) {
					$(form).find('input').parent('.ani-input-wrap').addClass('active');
				}
            },
            'sendSuccess': function (res) {
                //grecaptcha.reset(recaptcha);
				$('.ani-input-wrap').removeClass('active');
            }
        });

        //Jump links
        $('.si-jump').SIJump();

        //Page messages
        SIPageMessages.init();
    };

    $.fn.SIInit();


    // ===================================================== Modals
    $.fn.SIModalInit = function () {
        SIModals.init();

        // Init modals
        SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-mortgage-modal', '.mortgage-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-review-modal', '.review-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-text-modal', '.text-modal', false, function () {
            return '.text-modal-' + $(this).data('id');
        });

        // Modal controls
        SIModals.attachClose('.si-close');
    };

    $.fn.SIModalInit();

    //SIModals.afterOpen = function () {
    //grecaptcha.reset(recaptcha);
    //};

    // ===================================================== Styler
    $('input[type=file], input[type=radio], input[type=checkbox], input[type=number]').styler();
    $('input[type=radio]').change(function () {
        let label = $(this).closest('label'),
            name = $(this).attr('name');
        $('input[name="' + name + '"]').closest('label').removeClass('checked');
        if ($(this).is(':checked'))
            label.addClass('checked');
    });
    $('input[type=checkbox]').change(function () {
        let label = $(this).closest('label');
        if ($(this).is(':checked'))
            label.addClass('checked');
        else
            label.removeClass('checked');
    });

	$('.styler-destroy').styler('destroy');
	$('.choice-label-wrap input[type=radio]').styler('destroy');
	$('.choice-type-case-list input[type=radio]').styler('destroy');
	$('select').select2();

    // ===================================================== Counter
    let tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    $('.counter').countdown({
        until: tomorrow,
        layout: '<div class="counter-item"><b>{dnn}</b>{dl}</div><div class="counter-separator">:</div>' +
        '<div class="counter-item"><b>{hnn}</b>{hl}</div><div class="counter-separator">:</div>' +
        '<div class="counter-item"><b>{mnn}</b>{ml}</div><div class="counter-separator">:</div>' +
        '<div class="counter-item"><b>{snn}</b>{sl}</div>'
    });

    // ===================================================== spoiler
    $(".spoiler").spoiler();

    // ===================================================== swiper
    if($('html').find('.block-slider-holder')){
        let blockSlider = new Swiper('.block-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			  },
            navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			  },
            loop: true,
            autoplay: {
				delay: 5000,
			  },
			on: {
				slideChange: function() {
					$.ionSound.play('wuf-1');
				}
			}
        });
	}

	let advantagesSlider = new Swiper('.advantages-slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		hashNavigation: true,
		pagination: {
			el: '.advantages-pagination',
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return '0' + number;
			},
			formatFractionTotal: function (number) {
				return '0' + number;
			},
		},
		navigation: {
			nextEl: '.advantages-button-next',
			prevEl: '.advantages-button-prev',
		  },
		loop: false,
		on: {
			slideChange: function() {
				$.ionSound.play('wuf-1');
			},
			slideChangeTransitionEnd: function () {

				let activeSlide = $('.advantages-slider .swiper-slide-active').data('hash'),
				slideLink = $('.advantages-to-slide');
				slideLink.removeClass('active');
				slideLink.each(function () {
					if ($(this).data('slide') === activeSlide) $(this).addClass('active');
				});
			}
		}
	});

	$('.advantages-to-slide').click(function () {
		advantagesSlider.slideTo($(this).data('slide'));
	});

	let memberSlider = new Swiper('.member-slider', {
		spaceBetween: 20,
		navigation: {
			nextEl: '.member-button-next',
			prevEl: '.member-button-prev',
		  },
		loop: true,
		breakpoints: {
			320: {
				allowTouchMove: true,
				slidesPerView: 1,
			},
			621: {
				allowTouchMove: false,
				slidesPerView: 3,
			}
		},
		on: {
			slideChange: function() {
				$.ionSound.play('wuf-1');
			}
		}
	});

	//review swiper start
	let reviewSlider = new Swiper('.review-slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.review-pagination-fraction',
			type: 'fraction',
			formatFractionCurrent: addZero,
			formatFractionTotal: addZero,
		},
		navigation: {
			nextEl: '.review-button-next',
			prevEl: '.review-button-prev',
		  },
		loop: true,
	});

	if ($('.review-slider').length) {

		for (let i = 1; i < reviewSlider.slides.length - 1; i++) {
			if ( i === 1){
				$('.review-pagination-bullet').append('<span data-slide="' + i + '" class="swiper-pagination-bullet' + ' ' + 'swiper-pagination-bullet-active' + ' ' + 'slide' + i + '"></span>');
			} else {
				$('.review-pagination-bullet').append('<span data-slide="' + i + '" class="swiper-pagination-bullet' + ' ' + 'slide' + i + '"></span>');
			}
		}
	}

	let bullets = $('.review-pagination-bullet .swiper-pagination-bullet');
	reviewSlider.on('slideChange', function () {
		let slide = 'slide' + (reviewSlider.realIndex + 1);
		bullets.removeClass('swiper-pagination-bullet-active');
		$.each(bullets, function (index, value) {
			if($(this).hasClass(slide)) {
				$(this).addClass('swiper-pagination-bullet-active');
				return false;
			}
		});
	});

	bullets.click(function () {
		reviewSlider.slideTo($(this).data('slide'));
	});

	function addZero(num){
		return (num > 9) ? num : '0' + num;
	}
	//review swiper end

	let caseThumbs = new Swiper('.case-slider-thumbs', {
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
		loop: true,
		navigation: {
			nextEl: '.case-thumbs-next',
			prevEl: '.case-thumbs-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 3,
			},
			621: {
				slidesPerView: 4,
			}
		},
	});
	let caseTop = new Swiper('.case-slider-top', {
        spaceBetween: 0,
		loop: true,
        thumbs: {
          	swiper: caseThumbs,
        },
	});

    // =====================================================dotdotdot
    $('.ellipsis').dotdotdot();
    $(window).resize(function () {
        $('.ellipsis').dotdotdot();
    });

    // ===================================================== custom scripts

    //label
    $('.ani-label').click(function () {
        let label = $(this),
            holder = label.parent(),
            input = holder.find('.ani-input');

		if (holder.hasClass('active')) return false;

        holder.toggleClass('active');
        input.focus();
    });

    //menu
    function headerBehaviour() {
        if ($(window).scrollTop() > 0) {
            $('.layout-header').addClass('active');
        }
        else {
            $('.layout-header').removeClass('active');
        }
    }

    headerBehaviour();
    $(window).resize(function () {
        headerBehaviour();
    });
    $(window).bind('scroll', function () {
        headerBehaviour();
    });

    //accordion
    $('.question-item:first').addClass('active').find('.answer').css('display', 'block');
    $('.question-item').each(function () {
        let item = $(this),
            question = item.find('.question'),
            answer = item.find('.answer');
        answer.slideUp();
        if (item.hasClass('active')) {
            $(this).find('.answer').slideDown();
        }
        question.click(function () {
            if (question.parents('.question-item').hasClass('active')) {
                answer.slideUp();
                item.removeClass('active');
            }
            else {
                item.parents('.questions-block').find('.question-item').find('.answer').slideUp();
                answer.slideDown();
                item.parents('.questions-block').find('.question-item').removeClass('active');
                item.addClass('active');
            }
        });
    });

    //equal height
    function setEqualHeight(block) {
        let maxHeight = 0;

        block.each(function () {
            let height = $(this).innerHeight();

            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        return block.css('height', maxHeight);
    }

    setEqualHeight($('.block'));

	// ===================================================== mobile menu
	function closeGlobalNav(timeout) {
		let globalNavigation = $('.mobile-nav');

		$('html').removeClass('opened').removeClass('si-lock');
		$('.hamburger').removeClass('is-active');
		globalNavigation.removeClass('active');
		setTimeout(function () {
			globalNavigation.removeClass('visible');
		}, timeout);
	}

	//show menu button
	$('.hamburger').click(function (e) {
		let globalNavigation = $('.mobile-nav');

		if ($(this).hasClass('is-active')) {
			closeGlobalNav(600);
		}
		else {
			$('html').addClass('opened').addClass('si-lock');
			$(this).addClass('is-active');
			globalNavigation.addClass('visible').addClass('active');
		}
	});

	//navigation overlay click
	// $('.nav-overlay').click(function () {
	// 	closeGlobalNav(600);
	// });

	//close button click
	$('.mobile-nav-close').click(function () {
		closeGlobalNav(600);
	});

	//global link click
	$('.mobile-nav-link').click(function (e) {
		closeGlobalNav(1200);
	});

	$('#mobile-menu li .menu-link').click(function(e) {
		e.preventDefault();
		$('#mobile-menu li ul.submenu').slideUp(), $(this).next().is(':visible') || $(this).next().slideDown(),
		$('#mobile-menu li .menu-link').removeClass('active'), $(this).addClass('active'),
		e.stopPropagation();
	});

	//option hidden
	$('.filter-option-hide').click(function() {
		$('.hidden-params').slideToggle('slow');

		if ($(this).hasClass('hide')) {
			$(this).removeClass('hide');
			$(this).find('span').text('скрыть часть параметров');
		}
		else {
			$(this).addClass('hide');
			$(this).find('span').text('показать часть параметров');
		}
	});

	// $('.case-slide').click(function() {
	// 	if ($(this).hasClass('active')) {
	// 		$(this).removeClass('active');
	// 	}
	// 	else {
	// 		$(this).addClass('active');
	// 	}
	// });

	$('.show-map-add-case').click(function() {
		let th = $(this);

		if (th.hasClass('active')) {
			th.removeClass('active');
			$('.input-show').addClass('show');
			$('.map-contact-block').addClass('hide');
		}
		else {
			th.addClass('active');
			$('.input-show').removeClass('show');
			$('.map-contact-block').removeClass('hide');
		}
	});

	$('.show-map-choice-case').click(function() {
		let th = $(this);

		if (th.hasClass('active')) {
			th.removeClass('active');
			$('.choice-case-map').slideToggle();
		}
		else {
			th.addClass('active');
			$('.choice-case-map').slideToggle();
		}
        Is2bMap.map.setZoom(9);
	});

	//hide btn reviews all
	$('.section-reviews-all .review-view-all').click(function() {
		$(this).hide();
	});

	//heading item height
	if ($('.layout-header').hasClass('light')) $('.hamburger').addClass('dark');

	//show table calc mob
	$('.show-table').click(function () {
		if ($(this).hasClass('active')) {
			$('.calc-table').css('margin-left', '0');
			$(this).removeClass('active');
		}
		else {
			$('.calc-table').css('margin-left', '-488px');
			$(this).addClass('active');
		}
	});

	//fixed form
	let allReviews = $('.section-reviews-all').height() - 1000;

	$('.review-add-form').sticky({
		topSpacing: 0,
		bottomSpacing: allReviews
	});

	//star
	$('.star').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		}
		else {
			$(this).addClass('active');
		}
	});

    $('.price-mask').mask("000 000 000 000 000", {reverse: true});

    $('.sorting-list').on('change', (e) => {
        let url = new URL(location.href), value = e.target.value, values = value.split('_');
        let [sortValue, directionValue] = values.length === 3 ? [`${values[0]}_${values[1]}`, values[2]] : values;
        sortValue ? url.searchParams.set('sort', sortValue) : url.searchParams.delete('sort');
        directionValue ? url.searchParams.set('direction', directionValue) : url.searchParams.delete('direction');
        window.location.href = url.toString();
    })


    $('select[data-field^="Location."]').select2('destroy');
    Location.init('[data-field^="Location."]');

    $('.favorites-action').off('click');
    $('body').on('click', '.favorites-action', function (event) {
        event.preventDefault();
        Is2bFavorite.a = $(this);
        Is2bFavorite.run({
            callback: function () {
                $(`.favorites-action[data-id=${Is2bFavorite.a.get(0).dataset.id}]`).each((index, element) => {
                    let fEl = $(element);
                    if (Is2bFavorite.action === 'remove') {
                        fEl.data('action', 'add');
                        fEl.removeClass('active');
                        if(fEl.hasClass('in-favorites-action')){
                            fEl.closest('.col-1-3.col-xs-1').remove();
                        }
                    } else {
                        fEl.data('action', 'remove');
                        fEl.addClass('active');
                    }
                });
            }
        })
    })

    let categoriesParams =  $('.params-filter');
    if(categoriesParams.length > 0){
        let hideCategoryParams = () => { categoriesParams.addClass('hidden'); };
        let showCategoryParams = (categoryId, rentValue) => {
            let classRent = '';
            switch (rentValue) {
                case 'rent':
                    classRent = `._r1-${categoryId}`;
                    break;
                case 'sale':
                default:
                    classRent = `._r0-${categoryId}`;
                    break;
            }
            let s = `.params-filter.category-${categoryId}${classRent}`;
            console.log(s);
            $(s).removeClass('hidden');
        }
        hideCategoryParams();
        let categoryId = $('[name="data[Advertisement][category_id]"]:checked');
        let rent = $('[name="data[Advertisement][rent]"]:checked');
        if(categoryId.val()) {
            showCategoryParams(categoryId.val(), rent.val())
        }
        $('[name="data[Advertisement][category_id]"]').on('change', function (e) {
            hideCategoryParams();
            let categoryId = $('[name="data[Advertisement][category_id]"]:checked');
            let rent = $('[name="data[Advertisement][rent]"]:checked');
            showCategoryParams(categoryId.val(), rent.val())
        });
        $('[name="data[Advertisement][rent]"]').on('change', function (e) {
            hideCategoryParams();
            let categoryId = $('[name="data[Advertisement][category_id]"]:checked');
            let rent = $('[name="data[Advertisement][rent]"]:checked');
            showCategoryParams(categoryId.val(), rent.val())
        });

    }
    $('.JS-clean-values').on('click', function (e) {
        let form = $(this).closest('form');
        $('select', form).val('');
        $('select', form).trigger('change')
        $('textarea', form).val('');
        $('textarea', form).trigger('change')
        $('input:not([type="radio"])', form).val('');
        $('input:not([type="radio"])', form).trigger('change')
        $('input[type="checkbox"]', form).attr('checked', false);
        $('input[type="checkbox"]', form).trigger('change');
        form.trigger('clearValues');
    })

    let loadParams = function (categoryId) {
        $.ajax({
            url : `/agency/realty/category_params/${categoryId}?ajax_twig=1`,
            statusCode: {
                404: function () {
                    alert("page /agency/realty/category_params/ not found");
                },
                403: function () {
                    alert("Запрещен доступ к странице /agency/realty/category_params/");
                }
            },
            success : function(data){
                $('#categoryParams').replaceWith(data);
                $('#categoryParams').find('select').select2({language: 'ru', width: '100%'});
            }
        });
    }
    let $AdvertisementCategoryId = $('#AdvertisementCategoryId', $('#AdvertisementAddForm'));
    $AdvertisementCategoryId.on('change', e => {loadParams($(e.target).val())})
    let categoryParams = $('[data-ajax-load]#categoryParams');
    if(categoryParams.length > 0){
        loadParams($AdvertisementCategoryId.val());
    }

    $('.JS-add-photo').on('click', function (event) {
        event.preventDefault();
        $('.fileinput-button input').click();
    });

    $('.params-slider').each((i, item) => {
        let slider = $(item);
        let {min, max, step, field} = slider.data();
        let fromInput = $(`.case-range-${field} .filter-from`),
            toInput = $(`.case-range-${field} .filter-to`),
            from = fromInput.val() || min,
            to = toInput.val() || max;

        slider.slider({
            animate: 'slow',
            range: true,
            min: min,
            max: max,
            step: step,
            values: [Number(from), Number(to)],
            slide: function (event, ui) {
                $(`.case-range-${field}-min`).text(`от ${ui.values[0]}`);
                fromInput.val(ui.values[0]);
                $(`.case-range-${field}-max`).text(`от ${ui.values[1]}`);
                toInput.val(ui.values[1]);
            }
        });
        slider.closest('form').on('clearValues', e => {
            slider.slider({"values": [min, max]});
        })
        $(`.case-range-${field}-min`).text(`от ${slider.slider('values', 0)}`);
        $(`.case-range-${field}-max`).text(`от ${slider.slider('values', 1)}`);
    })

    let numericList = 1, linkListUrl = '';
    $('[data-load-objects]').on('click', e => {
        numericList++;
        linkListUrl = window.paginator_url.replace('page-id', numericList);
        if (numericList <= window.paginator_limit) {
            $.ajax({
                type: "GET",
                url: linkListUrl,
                dataType: "html",
                success: function (data) {
                    let objects = $(data).find('#appendLoadObjects > *');
                    $('#appendLoadObjects').append(objects);
                }
            })
        } else {
            $('[data-load-objects]').closest('.spoiler-holder').addClass('hidden');
        }
    })


    let numericUserList = 1, linkListUserUrl = '';
    $('[data-load-users]').on('click', e => {
        numericUserList++;
        linkListUserUrl = window.paginator_user_url.replace('page-id', numericUserList);
        if (numericUserList <= window.paginator_user_limit) {
            $.ajax({
                type: "GET",
                url: linkListUserUrl,
                dataType: "html",
                success: function (data) {
                    let objects = $(data).find('#appendLoadUsers > *');
                    $('#appendLoadUsers').append(objects);
                }
            })
        } else {
            $('[data-load-users]').closest('.spoiler-holder').addClass('hidden');
        }
    })
});
