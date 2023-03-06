import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsGear } from "solid-icons/bs";
import { useTransContext } from "@mbarzda/solid-i18next";

import style from "./home.module.scss";


import Header from "Components/Header/header";
import HomePageFooter from "./footer/homePageFooter";
import MenuRenderer from "./menuRenderer";
import { hideUi, setHideUi } from "./homeState";
import MenuContent from "./menuContent";


const Home: solid.Component = () => {
    const [t] = useTransContext();
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);

    let containerRef: HTMLDivElement | undefined;
    let animationTimeout: NodeJS.Timeout;

    useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        if (!containerRef) return;
        setFadeOut(true);
        setTimeout(() => {
            e.retry(true);
        }, 300)
    });

    function handleClick() {
        if (hideUi()) setHideUi(false);
    }

    solid.onMount(() => {
        if (containerRef) containerRef.style.animation = "blackIn 0.5s linear forwards";
        animationTimeout = setTimeout(() => {
            if (containerRef) containerRef.style.animation = "";
        }, 500);
    });

    solid.onCleanup(() => {
        clearTimeout(animationTimeout);
    });

    return (
        <div class={style.home} ref={containerRef} classList={{  fadeOut: hideUi()||fadeOut() }} onClick={handleClick}>
            <Header title={t("menu.title").toString()} />
            <main class={style.main}>
                {/* <MenuRenderer /> */}
                <MenuContent />
            </main>
            <HomePageFooter />
        </div >
    )
}

export default Home;