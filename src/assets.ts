function importAll(r: any): string[] {
    return r.keys().map(r);
}

export const event_images = importAll(require.context('./event_assets', false, /\.(png|jpe?g|svg)$/));
export const ethics_images = importAll(require.context('./ethics_assets', false, /\.(png|jpe?g|svg)$/));
