const Link = require('../../models/link');

class Links {
    constructor(links, applicant) {
        this.links = links;
        this.applicant = applicant;
    }

    create() {
        if (!this.links || !this.links.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const link of this.links) {
                await this.#createLink(link);
            }
            resolve();
        });
    }

    update() {
        if (!this.links || !this.links.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestLinks = await this.#deleteRemovedLinks();
            for await (const link of newestLinks) {
                await this.#createLink(link);
            }

            const notChangedLinks = this.links.filter((link) => !!link.id);
            for await (const link of notChangedLinks) {
                await Link.update({
                    link: link && link.link ? link.link : '',
                    linkTypeId: link && link.linkType && link.linkType.id ? link.linkType.id : null,
                }, { where: { id: link.id } })
            }
            resolve();
        });
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            await Link.destroy({ where: { applicantId }});
            resolve();
        });
    }

    #createLink(link) {
        if (!link || !link.link) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newLink = await Link.create({ link: link.link });

            if (link && link.linkType && link.linkType.id) {
                newLink.setLinkType(link.linkType.id);
            }
            newLink.setApplicant(this.applicant);
            resolve(newLink);
        });
    }

    #deleteRemovedLinks() {
        return new Promise(async (resolve) => {
            const prevStoredLinks = this.applicant.links || []
            const newLinksIds = this.links.filter((link) => !!link.id).map((d) => d.id);

            for await (const prevStoredLink of prevStoredLinks) {
                if (!newLinksIds.includes(prevStoredLink.id)) {
                    await Link.destroy({ where: { id: prevStoredLink.id } });
                }
            }

            const newestLinks = this.links.filter((link) => !link.id);

            resolve(newestLinks);
        });
    }

}

module.exports = Links;