import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent({
    repo,
    repoId,
    category,
    categoryId
}) {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo={repo}
            repoId={repoId}
            category={category}
            categoryId={categoryId}  // E.g. id of "General"
            mapping="pathname"                        // Important! To map comments to URL
            strict="0"
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="top"
            theme={colorMode}
            lang="en"
            loading="lazy"
            crossorigin="anonymous"
            async
        />
    );
}