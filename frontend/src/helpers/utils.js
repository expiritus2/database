export const formatNumber = (value, params = {}, locale = 'en-US') => new Intl.NumberFormat(locale, params).format(value);

export function titleCase(str) {
    if (!str) return '';
    const wordsArray = str.toLowerCase().split(/\s+/);
    const upperCased = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.substr(1));
    return upperCased.join(' ');
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
                resolve({
                    url: result,
                    data: file,
                });
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

export const cleanOptions = (options) => {
    if (!options) return options;

    return options.map((option) => ({ id: option?.id, label: option?.label?.trim(), value: option?.value?.trim() }));
};
