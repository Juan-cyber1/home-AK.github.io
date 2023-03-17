const contenedorBanner = document.querySelector("#cont-banner");
const contenedorAutopauta = document.querySelector("#autopautas");
const contenedorCategorias = document.querySelector("#cont-categorias");
const contenedorCel = document.querySelector("#cont-cel");
const contenedorPc = document.querySelector("#cont-pc");
const contenedorTv = document.querySelector("#cont-tv");
const contenedorElectro = document.querySelector("#cont-electro");
const contenedorOfertas = document.querySelector("#cont-mas-of");
const contenedorOfertas2 = document.querySelector("#cont-mas-of2");
const preload = document.querySelector("#preload");
const contenido = document.querySelector("#contenido");

const globalData = {};

const cargarInfo = async () => {
    const bannerPrincipal = await fetch('https://feeds.datafeedwatch.com/78900/7e8045bbf1c708fab09aa37848453ca58f2a7cbf.json', {
        cache: 'no-cache'
    });
    if (bannerPrincipal.ok) {
        const jsonBanner = await bannerPrincipal.json();
        const banners = jsonBanner.products;
        const orderCatBanner = banners.sort((a, b) => {
            if (a.banner_posicion < b.banner_posicion) {
                return -1;
            }
        })
        pintarBanners(orderCatBanner);
    } else {
        console.log("error en carga del banner");
    }
    const bannerAutoPauta = await fetch('https://feeds.datafeedwatch.com/78900/f66d7f56ee99950117bf6803d9205608c5c1d7cd.json', {
        cache: 'no-cache'
    });
    if (bannerAutoPauta.ok) {
        const jsonBanner = await bannerAutoPauta.json();
        const bannersAutopauta = jsonBanner.products;
        const orderAutopauta = bannersAutopauta.sort((a, b) => {
            if (a.autopauta_pos_banner < b.autopauta_pos_banner) {
                return -1;
            }
        })
        pintarAutopauta(orderAutopauta);
    } else {
        console.log("error en carga del autopauta");
    }
    const categorias = await fetch('https://feeds.datafeedwatch.com/78900/cacfef9fdb879ca1fe3c5a5799056936fe2faa14.json', {
        cache: 'no-cache'
    });
    if (categorias.ok) {
        const jsonBanner = await categorias.json();
        const categoriasJSON = jsonBanner.products;
        const orderCategorias = categoriasJSON.sort((a, b) => {
            let primerNum = parseInt(a.cat_posicion);
            let segundoNum = parseInt(b.cat_posicion);
            if (primerNum < segundoNum) {
                return -1;
            }
        })
        pintarCategorias(orderCategorias);
    } else {
        console.log("error en carga de categorias");
    }
    const productos = await fetch('https://feeds.datafeedwatch.com/78900/f6f606b278ad154cecc250d99fc2d1eae51922d1.json', {
        cache: 'no-cache'
    });
    if (productos.ok) {
        const jsonProducts = await productos.json();
        const productosJSON = jsonProducts.products;
        pintarProductos(productosJSON);
    } else {
        console.log("error en carga del banner");
    }
}

const pintarBanners = (i) => {
    const banner_posicion = i.map((banner) => {
        return `
        <li class="splide__slide fadeIn">
        <a target="_blank" href="${banner.banner_CTA} rel="noopener noreferrer">
        <picture>
            <source type="image/webp" width="100" media="(max-width: 799px)" srcset="${banner.banner_mobile_webp}"/>
            <source width="100" media="(max-width: 799px)" srcset="${banner.banner_mobile_jpg}"/>
            <source type="image/webp" width="100" srcset="${banner.banner_desktop_webp}"/>
            <img loading="lazy" width="100" src="${banner.banner_desktop_jpg}" alt="${banner.banner_desc_img}" />
        </picture>
        </a>
        </li>`
    }).join("");

    contenedorBanner.innerHTML = banner_posicion;

    var splide = new Splide('#banner-principal', {
        pagination: false,
        type: 'slide',
        rewind: true,
        interval: 5000,
        speed: '2000',
        prev: "<i>></i>",
        next: "HTMLButtonElement"

    })
    var bar = splide.root.querySelector('.my-slider-progress-bar');
    splide.on('mounted move', function () {
        var end = splide.Components.Controller.getEnd() + 1;
        var rate = Math.min((splide.index + 1) / end, 1);
        bar.style.width = String(100 * rate) + '%';
    }).mount();
}

const pintarAutopauta = (a) => {
    console.log(a);
    let autopauta_1 = `
    <div class="col-xs-11 col-sm-6 text-center fadeIn col-md-4 autopauta-principal">
    <a title="${a[0].autopauta_desc_img}" href="${a[0].autopauta_CTA}">    
        <picture>
            <source type="image/webp" width="100" class="img img-responsive" srcset="${a[0].autopauta_desktop_webp}" />
            <img loading="lazy" width="100" class="img-autopauta" src="${a[0].autopauta_desktop_jpg}" type="image/jpg" alt="${a[0].autopauta_desc_img}"/>
        </picture>
    </a>
        </div>`;
    let autopauta_2 = `
    <div class="col-xs-11 col-sm-6 text-center fadeIn col-md-4 autopauta-principal">
    <a title="${a[1].autopauta_desc_img}" href="${a[1].autopauta_CTA}">    
        <picture>
            <source type="image/webp" width="100" class="img img-responsive" srcset="${a[1].autopauta_desktop_webp}"/>
            <img loading="lazy" width="100" class="img-autopauta" src="${a[1].autopauta_desktop_jpg}" type="image/jpg" alt="${a[1].autopauta_desc_img}"/>
        </picture>
    </a>
        </div>`;
    let autopauta_3 = `
    <div class="col-xs-11 col-sm-4 text-center fadeIn col-md-4 autopauta-secundario">
    <a title="${a[2].autopauta_desc_img}" href="${a[2].autopauta_CTA}">    
        <picture>
            <source type="image/webp" width="100" class="img img-responsive" srcset="${a[2].autopauta_desktop_webp}"/>
            <img loading="lazy" width="100"class="img-autopauta" src="${a[2].autopauta_desktop_jpg}" type="image/jpg" alt="${a[2].autopauta_desc_img}"/>
        </picture>
    </a>
        </div>`;
    let autopauta_4 = `
    <div class="col-xs-11 col-sm-4 text-center fadeIn col-md-4 autopauta-secundario">
    <a title="${a[3].autopauta_desc_img}" href="${a[3].autopauta_CTA}">    
        <picture>
            <source type="image/webp" width="100" class="img img-responsive" srcset="${a[3].autopauta_desktop_webp}"/>
            <img loading="lazy" width="100" class="img-autopauta" src="${a[3].autopauta_desktop_jpg}" type="image/jpg" alt="${a[3].autopauta_desc_img}"/>
        </picture>
    </a>
        </div>`;
    let autopauta_5 = `
    <div class="col-xs-11 col-sm-4 text-center fadeIn col-md-4 autopauta-secundario">
    <a title="${a[4].autopauta_desc_img}" href="${a[4].autopauta_CTA}">    
        <picture>
            <source type="image/webp" width="100" class="img img-responsive" srcset="${a[4].autopauta_desktop_webp}"/>
            <img loading="lazy" width="100" class="img-autopauta" src="${a[4].autopauta_desktop_jpg}" type="image/jpg" alt="${a[4].autopauta_desc_img}"/>
        </picture>
    </a>
        </div>`;


    contenedorAutopauta.innerHTML = autopauta_1 + autopauta_2 + autopauta_3 + autopauta_4 + autopauta_5;

}

const pintarCategorias = (ca) => {

    mapCategorias = ca.map((c) => {
        return `
        <div class="categoria text-center fadeIn">
        <a href="${c.cat_CTA}" title="${c.cat_nombre}">
        <picture>
            <source srcset="${c.cat_webp}" type="image/webp"  />
            <img loading="lazy" width="100" class="img img-cat img-responsive" src="${c.cat_png}" type="image/png" alt="${c.cat_desc_img}"/>
        </picture>
        <p class="name-cat">
        ${c.cat_nombre}
        </p>
        </a>
        </div>
        `
    }).join("");

    contenedorCategorias.innerHTML = mapCategorias + `<div class="ofertas"><a href="/ofertas">
    <i class="ico-font alk-icon-offers"></i>
    Ofertas
    </a></div>`;
}

const pintarProductos = (p) => {
    let celulares = p.filter(prodCelular => prodCelular.cat_home == 'Celulares');
    let computadores = p.filter(prodPc => prodPc.cat_home == 'Computadores');
    let televisores = p.filter(prodTv => prodTv.cat_home == 'Televisores');
    let electro = p.filter(prodEl => prodEl.cat_home == 'Electrodomésticos');
    let ofertas_1 = p.filter(of_1 => of_1.cat_home == 'Conoce más').slice(0, 4);
    let ofertas_2 = p.filter(of_1 => of_1.cat_home == 'Conoce más').slice(4, 8);

    let mapCelulares = celulares.map((cel) => {
        return `
        <div class="col-md-4">
        <a href="${cel.url_prod}" title ="${cel.nombre_prod}" target="_blank" rel="noopener noreferrer">
        <picture>
            <source width="100" class="img img-prod img-responsive" srcset="${cel.img_prod_webp}" type="image/webp"  />
            <img width="100" loading="lazy" class="img img-prod img-responsive" src="${cel.img_prod_jpg}" type="image/jpg" alt="${cel.nombre_prod}"/>
        </picture>
        </a>
        </div>
        `
    }).join("");

    let mapPc = computadores.map((pc) => {
        return `
        <div class="col-md-4">
        <a href="${pc.url_prod}" title ="${pc.nombre_prod}" target="_blank" rel="noopener noreferrer">
        <picture>
            <source width="100" class="img img-prod img-responsive" srcset="${pc.img_prod_webp}" type="image/webp"  />
            <img width="100" loading="lazy" class="img img-prod img-responsive" src="${pc.img_prod_jpg}" type="image/jpg" alt="${pc.nombre_prod}"/>
        </picture>
        </a>
        </div>
        `
    }).join("");

    let mapTv = televisores.map((tv) => {
        return `
        <div class="col-md-4">
        <a href="${tv.url_prod}" title ="${tv.nombre_prod}" target="_blank" rel="noopener noreferrer">
        <picture>
            <source width="100" class="img img-prod img-responsive" srcset="${tv.img_prod_webp}" type="image/webp"  />
            <img width="100" loading="lazy" class="img img-prod img-responsive" src="${tv.img_prod_jpg}" type="image/jpg" alt="${tv.nombre_prod}"/>
        </picture>
        </a>
        </div>
        `
    }).join("");

    let mapElectro = electro.map((el) => {
        return `
        <div class="col-md-4">
        <a href="${el.url_prod}" title ="${el.nombre_prod}" target="_blank" rel="noopener noreferrer">
        <picture>
            <source width="100" class="img img-prod img-responsive" srcset="${el.img_prod_webp}" type="image/webp"  />
            <img width="100" loading="lazy" class="img img-prod img-responsive" src="${el.img_prod_jpg}" type="image/jpg" alt="${el.nombre_prod}"/>
        </picture>
        </a>
        </div>
        `
    }).join("");

    let mapOfertas_1 = ofertas_1.map((of1) => {

        return `
        <div class="col-md-3">
        <a href="${of1.url_prod}" title ="${of1.nombre_prod}" target="_blank" rel="noopener noreferrer">
        <picture>
            <source width="100" class="img img-prod img-responsive" srcset="${of1.img_prod_webp}" type="image/webp"  />
            <img width="100" loading="lazy" class="img img-prod img-responsive" src="${of1.img_prod_jpg}" type="image/jpg" alt="${of1.nombre_prod}"/>
        </picture>
        </a>
        </div>
        `
    }).join("");

    let mapOfertas_2 = ofertas_2.map((of2) => {
        return `
        <div class="col-md-3">
        <a href="${of2.url_prod}" title ="${of2.nombre_prod}" target="_blank" rel="noopener noreferrer">
        <picture>
            <source width="100" class="img img-prod img-responsive" srcset="${of2.img_prod_webp}" type="image/webp"  />
            <img width="100" loading="lazy" class="img img-prod img-responsive" src="${of2.img_prod_jpg}" type="image/jpg" alt="${of2.nombre_prod}"/>
        </picture>
        </a>
        </div>
        `
    }).join("");

    
    contenedorCel.innerHTML = mapCelulares;
    contenedorPc.innerHTML = mapPc;
    contenedorTv.innerHTML = mapTv;
    contenedorElectro.innerHTML = mapElectro;
    contenedorOfertas.innerHTML = mapOfertas_1;
    contenedorOfertas2.innerHTML = mapOfertas_2;
}


cargarInfo();