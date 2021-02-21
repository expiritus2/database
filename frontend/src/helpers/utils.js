import { filter } from 'lodash-es';

export function isSuccessfulResponse(meta) {
    return meta && meta.status >= 200 && meta.status < 300;
}

export function getImagesPreview(files) {
    if (!files) {
        return Promise.reject();
    }

    const promises = [];
    const filesArray = Array.from(files);

    filesArray.forEach((file) => {
        const promise = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const { result } = e.target;
                resolve({ url: result });
            };

            reader.onerror = () => {
                reject();
            };

            reader.readAsDataURL(file);
        });
        promises.push(promise);
    });

    return Promise.all(promises);
}

export const pushOrRemove = ({ arr, id, multiple = false }) => (
    arr.includes(id)
        ? filter(arr, (activeId) => activeId !== id)
        : [...(multiple ? arr : []), id]
);
