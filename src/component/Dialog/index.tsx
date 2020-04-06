import React from 'react';
import eventTopBg from '../../assets/Event_bg_top.png';
import eventBodyBg from '../../assets/Event_bg_body.png';
import eventBottomBg from '../../assets/Event_bg_bottom.png';
import styles from './index.module.css';

function EvenetHeader(prop: { title: string, image: string }) {
    return (
        <div className={styles.event_header_container}>
            <div className={styles.event_title}>
                {prop.title}
            </div>
            <img className={styles.event_img} alt="Event" src={prop.image} />
            <img className={styles.event_img_bg} alt="Event" src={eventTopBg} />
        </div>
    );
}

function EventContent(prop: { content: string }) {
    return (
        <div className={styles.event_content_container}>
            {prop.content}
        </div>
    );
}

export interface IOption {
    content: string,
    ethics?: string
}

function EventOption(prop: IOption) {
    return (
        <div className={styles.event_option_container} >
            {prop.ethics &&
                <img className={styles.event_option_ethics} alt="option ethics" src={prop.ethics} />}
            <div className={styles.event_option_content}>
                {prop.content}
            </div>
        </div>
    );
}

export interface IDialog {
    title: string,
    image: string,
    content: string,
    options: IOption[]
}

export function EventDialog(prop: IDialog) {
    return (
        <div className={styles.event_dialog}>
            <EvenetHeader title={prop.title} image={prop.image} />
            <div className={styles.event_body} style={{ backgroundImage: `url(${eventBodyBg})` }}>
                <EventContent content={prop.content} />
                <div className={styles.options_container}>
                    {prop.options.map((it, index) =>
                        <EventOption key={index} content={it.content} ethics={it.ethics} />
                    )}
                </div>
            </div>
            <img alt="background bottom" className={styles.event_dialog_bottom} src={eventBottomBg} />
        </div>
    );
}