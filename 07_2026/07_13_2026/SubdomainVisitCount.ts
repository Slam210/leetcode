/*
 * @lc app=leetcode id=811 lang=typescript
 *
 * [811] Subdomain Visit Count
 */
// @lc code=start
function subdomainVisits(cpdomains: string[]): string[] {
    const countsMap = new Map<string, number>();

    for (const entry of cpdomains){
        const [countStr, domain] = entry.split(' ');
        const count = Number(countStr);

        const parts = domain.split('.');

        for (let i = 0; i < parts.length; i++){
            const subdomain = parts.slice(i).join('.');
            countsMap.set(subdomain, (countsMap.get(subdomain) ?? 0) + count);
        }
    }

    const result: string[] = [];

    for (const [domain, count] of countsMap) {
        result.push(`${count} ${domain}`);
    }

    return result;
};
// @lc code=end