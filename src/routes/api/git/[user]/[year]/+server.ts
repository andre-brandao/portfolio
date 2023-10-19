import { json } from '@sveltejs/kit';
import { parseHTML } from 'linkedom';
import type { RouteParams } from './$types.js';

export async function GET({ params, setHeaders }) {
   //    const year = 60 * 60 * 24 * 365;

   // https://vercel.com/docs/edge-network/caching#cdn-cache-control
   //    setHeaders({
   //       'Access-Control-Allow-Origin': '*',
   //       'Cache-Control': `public, s-maxage=${year}`,
   //       'CDN-Cache-Control': `public, s-maxage=${year}`,
   //       'Vercel-CDN-Cache-Control': `public, s-maxage=${year}`,
   //    });

   setHeaders({
      'Access-Control-Allow-Origin': '*', // allow CORS
      'Cache-Control': `public, s-maxage=${60 * 60 * 24 * 365}`, // one year
   });

   //    console.log('getContributions');

   const html = await getContributions(params);

   //    console.log(html);

   return json(parseContributions(html));
}

async function getContributions({ user, year }: RouteParams) {
   let api = `https://github.com/users/${user}/contributions?from=${year}-12-01&to=${year}-12-31`;

   const isCurrentYear = new Date().getFullYear().toString() === year;

   if (isCurrentYear) {
      const date = new Date().toLocaleDateString('en-CA');
      const month = date.split('-')[1];
      api = `https://github.com/users/${user}/contributions?from=${year}-${month}-01&to=${date}`;
   }

   try {
      const response = await fetch(api);

      if (!response.ok) {
         throw new Error(`Failed to fetch: ${response.status}`);
      }

      return await response.text();
   } catch (e) {
      throw new Error(`Something went wrong: ${e}`);
   }
}

function parseContributions(html: string) {
   const { document } = parseHTML(html);

   const rows = document.querySelectorAll<HTMLTableRowElement>('tbody > tr');

   const contributions = [];

   for (const row of rows) {
      const days = row.querySelectorAll<HTMLTableCellElement>(
         'td:not(.ContributionCalendar-label)'
      );
      //   console.log('Days:');

      //   console.log(days);

      const currentRow = [];

      const dayOfWeekElement = row.querySelector('td.ContributionCalendar-label');
      //   if (dayOfWeekElement) {
      const dayOfWeek = dayOfWeekElement.querySelector('span:first-child').textContent;
      //  currentRow.push(dayOfWeek);
      //   }

      for (const day of days) {
         const data = day.innerText.split(' ');
         console.log('data:');
         console.log(data);

         //  const date = day.getAttribute('data-date');

         if (data.length > 1) {
            const contribution = {
               count: data[0] === 'No' ? 0 : +data[0],
               date: day.dataset.date,
               name: dayOfWeek,
               month: data[3],
               day: data[4],
               year: day.dataset.date?.split('-')[0],
               level: +day.dataset.level!,
            };
            currentRow.push(contribution);
         } else {
            currentRow.push(null);
         }
      }

      contributions.push(currentRow);
   }

   return contributions;
}
