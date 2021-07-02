export const setUnit = (px) => `${px / 16}rem`;

export const formatNumber = (value, params = {}, locale = 'en-US') => new Intl.NumberFormat(locale, params).format(value);

export function readFiles(files, cb = (reader, file) => reader.readAsBinaryString(file)) {
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
                resolve({
                    contentType: file.type,
                    filename: file.name,
                    size: file.size,
                    data: result,
                });
            };

            reader.onerror = () => {
                reject();
            };

            cb(reader, file);
        });
        promises.push(promise);
    });

    return Promise.all(promises);
}

export function downloadFile(blank = false) {
    const createTemporaryLink = (url, filename) => {
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);

        if (blank) {
            element.setAttribute('target', '_blank');
        }

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return {
        byLink: createTemporaryLink,
        asBlob: (data, filename) => {
            const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);
            createTemporaryLink(url, filename);
        },
    };
}

export const hasVerticalScroll = (node) => {
    if (node === undefined) {
        if (window.innerHeight) {
            return document.body.offsetHeight > window.innerHeight;
        }

        return document.documentElement.scrollHeight
            > document.documentElement.offsetHeight
            || document.body.scrollHeight > document.body.offsetHeight;
    }

    return node.scrollHeight > node.offsetHeight;
};
