'use client';

import React from 'react';
import Cookie from 'js-cookie';

export default function ResetCookies() {
    React.useEffect(() => {
        Cookie.remove('compared-report-id');
    }, []);

    return null;
}
