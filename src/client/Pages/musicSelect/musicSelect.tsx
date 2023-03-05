import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsGear } from "solid-icons/bs";
import { useTransContext } from "@mbarzda/solid-i18next";

import style from "./musicSelect.module.scss";


import Header from "Components/Header/header";
import MusicSelectToolbar from "./toolBar";
import MusicList from "./musicList";


const MusicSelect: solid.Component = () => {
    const [t] = useTransContext();
    const navigate = useNavigate();
    const [blackOut, setBlackOut] = solid.createSignal<boolean>(false);


    let containerRef: HTMLDivElement | undefined;
    let animationTimeout: NodeJS.Timeout;

    useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        if (!containerRef) return;
        setBlackOut(true);
        setTimeout(() => {
            e.retry(true);
        }, 1000)
    });

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
        <div class={style.musicSelect} ref={containerRef} classList={{ blackOut: blackOut() }}>
            <Header title={t("musicSelect.title").toString()} />
            <MusicSelectToolbar />
            <div class={style.content}>
                <MusicList />
            </div>
        </div >
    )
}

export default MusicSelect;