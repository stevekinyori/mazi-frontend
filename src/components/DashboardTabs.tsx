/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import { Popover, Tabs } from 'antd';
import ArchiveLineIcon from 'remixicon-react/ArchiveLineIcon';
import ArchiveFillIcon from 'remixicon-react/ArchiveFillIcon';

interface DashboardTabsParams {
  selectedTab: string;
  tabChange: (key: string) => void;
}

export default function DashboardTabs({ selectedTab, tabChange }: DashboardTabsParams) {
  const nav = useLocation();

  const debenturesSubmenu = (
    <div className="divide-y">
      <Link
        to="/dashboard/customers/cargo-in-transit"
        className={`flex items-center p-s-2 font-semibold ${
          nav.pathname.includes('cargo-in-transit') ? 'text-sky-600' : 'text-gray-500'
        } hover:text-sky-600`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.64844 0.625V4.10156H10C10.582 4.10156 10.8984 4.55859 10.9297 5.02344C10.9453 5.25781 10.8828 5.47266 10.7461 5.625C10.6094 5.78125 10.3906 5.89844 10 5.89844C9.80469 5.89844 9.56641 5.78906 9.39062 5.60938C9.21094 5.43359 9.10156 5.19531 9.10156 5H8.39844C8.39844 5.42969 8.60156 5.81641 8.89062 6.10938C9.18359 6.39844 9.57031 6.60156 10 6.60156C10.5469 6.60156 10.9922 6.40625 11.2695 6.09375C11.5508 5.77734 11.6602 5.36719 11.6328 4.97656C11.5859 4.29297 11.1094 3.60234 10.3516 3.43672V0.625H9.64844ZM7.77734 6.11328L2.39609 9.64844H3.67344L8.16016 6.69922L7.77734 6.11328ZM12.2227 6.11328L11.8398 6.69922L16.3281 9.64844H17.6016L12.2227 6.11328ZM1.60156 10.3516V19.0234H18.3984V10.3516H1.60156ZM3.08594 11.25H3.78906V18.125H3.08594V11.25ZM4.96094 11.25H5.66406V18.125H4.96094V11.25ZM6.83594 11.25H7.53906V18.125H6.83594V11.25ZM8.71094 11.25H9.41406V18.125H8.71094V11.25ZM10.5859 11.25H11.2891V18.125H10.5859V11.25ZM12.4609 11.25H13.1641V18.125H12.4609V11.25ZM14.3359 11.25H15.0391V18.125H14.3359V11.25ZM16.2109 11.25H16.9141V18.125H16.2109V11.25Z" />
        </svg>
        <div className="ml-s-0.5">Cargo in transit</div>
      </Link>

      <Link
        to="/dashboard/customers/cash-at-hand"
        className={`flex items-center p-s-2 font-semibold ${
          nav.pathname.includes('cash-at-hand') ? 'text-sky-600' : 'text-gray-500'
        } hover:text-sky-600`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9571 9.89533C14.7235 9.89533 16.9738 7.6758 16.9738 4.94767C16.9738 2.21954 14.7235 0 11.9571 0C9.19059 0 6.93988 2.21954 6.93988 4.94767C6.93988 7.6758 9.19059 9.89533 11.9571 9.89533ZM11.3629 2.03946V1.90508C11.3629 1.58125 11.6287 1.31914 11.9571 1.31914C12.285 1.31914 12.5512 1.58125 12.5512 1.90508V2.04024C13.2583 2.18985 13.7903 2.81094 13.7903 3.55235C13.7903 3.87579 13.5241 4.13829 13.1961 4.13829C12.8677 4.13829 12.6019 3.87579 12.6019 3.55235C12.6019 3.34571 12.4312 3.17735 12.2217 3.17735H11.6889C11.4793 3.17735 11.30863.34571 11.3086 3.55235C11.3086 3.67071 11.3661 3.78321 11.4627 3.85352L11.9571 4.21446L13.1581 5.09103C13.5526 5.37892 13.7903 5.83946 13.7934 6.32384V6.32931C13.7962 6.74259 13.6358 7.13244 13.3411 7.42658C13.1224 7.64494 12.8491 7.79142 12.5512 7.85314V7.99025C12.5512 8.31408 12.285 8.57619 11.9571 8.57619C11.6287 8.57619 11.3629 8.31408 11.3629 7.99025V7.85509C11.0729 7.79416 10.8063 7.65353 10.5909 7.44337C10.2926 7.15314 10.127 6.76564 10.1246 6.35236C10.1227 6.02892 10.3869 5.76486 10.7148 5.7629H10.7188C11.0452 5.7629 11.311 6.02306 11.313 6.34533C11.3138 6.54755 11.4787 6.71798 11.6952 6.71798L12.2272 6.71486C12.4381 6.71322 12.6067 6.54443 12.6051 6.33712V6.33165C12.6043 6.21447 12.5469 6.10275 12.451 6.03282L11.9571 5.67228L10.7556 4.79571C10.3579 4.50509 10.1203 4.04024 10.1203 3.55235C10.1203 2.80938 10.6538 2.1879 11.3629 2.03946ZM3.82804 12.7107C3.67573 12.4503 3.33741 12.3597 3.07174 12.5108L0.276837 14.1018C0.0121929 14.2529 -0.0785964 14.5867 0.0741848 14.848L2.93072 19.727C3.08362 19.9879 3.4219 20.0775 3.68702 19.9269L6.48192 18.3354C6.74696 18.1847 6.83739 17.851 6.68457 17.5896L3.82804 12.7107ZM18.6799 11.5505C19.0531 11.2853 19.5736 11.3685 19.8425 11.7369C20.1119 12.1052 20.0271 12.6193 19.6532 12.8841C19.6529 12.8843 19.6153 12.9113 19.547 12.9605C19.0376 13.3268 16.8223 14.9199 15.6691 15.7369C15.3569 15.958 15.069 16.1412 14.8 16.2935C14.024 16.7338 13.1423 16.9595 12.247 16.9595H7.68777L5.25721 12.8084C5.87872 11.5591 7.37761 10.6232 8.88403 10.6232C9.73132 10.6232 10.514 10.8955 11.1474 11.356C11.3316 11.49 11.5035 11.64 11.6604 11.8037H13.9773C14.4027 11.8037 14.7655 12.1287 14.783 12.5478C14.8016 12.9896 14.4435 13.3568 13.9963 13.3568H10.9525C10.625 13.3568 10.3584 13.6185 10.3584 13.9427C10.3584 14.2666 10.6246 14.5287 10.9525 14.5287H13.7986C14.2126 14.5287 14.6091 14.4154 14.9509 14.2033C15.0381 14.1498 15.1216 14.0892 15.2013 14.0224C15.374 13.8994 17.5478 12.3548 18.6799 11.5505Z"
          />
        </svg>
        <div className=" ml-s-0.5">Cash at hand</div>
      </Link>

      <Link
        to="/dashboard/customers/inventory-value"
        className={`flex items-center p-s-2 font-semibold ${
          nav.pathname.includes('inventory-value') ? 'text-sky-600' : 'text-gray-500'
        } hover:text-sky-600`}
      >
        <ArchiveFillIcon className="mr-s-1.5" size={22} />
        <div>Inventory value</div>
      </Link>

      <Link
        to="/dashboard/customers/receivables"
        className={`flex items-center p-s-2 font-semibold ${
          nav.pathname.includes('receivables') ? 'text-sky-600' : 'text-gray-500'
        } hover:text-sky-600`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11.6667 10.8334C10.9722 10.8334 10.3819 10.5903 9.89583 10.1042C9.40972 9.6181 9.16666 9.02782 9.16666 8.33337C9.16666 7.63893 9.40972 7.04865 9.89583 6.56254C10.3819 6.07643 10.9722 5.83337 11.6667 5.83337C12.3611 5.83337 12.9514 6.07643 13.4375 6.56254C13.9236 7.04865 14.1667 7.63893 14.1667 8.33337C14.1667 9.02782 13.9236 9.6181 13.4375 10.1042C12.9514 10.5903 12.3611 10.8334 11.6667 10.8334ZM5.83333 13.3334C5.37499 13.3334 4.98263 13.1702 4.65624 12.8438C4.32986 12.5174 4.16666 12.125 4.16666 11.6667V5.00004C4.16666 4.54171 4.32986 4.14935 4.65624 3.82296C4.98263 3.49657 5.37499 3.33337 5.83333 3.33337H17.5C17.9583 3.33337 18.3507 3.49657 18.6771 3.82296C19.0035 4.14935 19.1667 4.54171 19.1667 5.00004V11.6667C19.1667 12.125 19.0035 12.5174 18.6771 12.8438C18.3507 13.1702 17.9583 13.3334 17.5 13.3334H5.83333ZM7.49999 11.6667H15.8333C15.8333 11.2084 15.9965 10.816 16.3229 10.4896C16.6493 10.1632 17.0417 10 17.5 10V6.66671C17.0417 6.66671 16.6493 6.50351 16.3229 6.17712C15.9965 5.85073 15.8333 5.45837 15.8333 5.00004H7.49999C7.49999 5.45837 7.3368 5.85073 7.01041 6.17712C6.68402 6.50351 6.29166 6.66671 5.83333 6.66671V10C6.29166 10 6.68402 10.1632 7.01041 10.4896C7.3368 10.816 7.49999 11.2084 7.49999 11.6667ZM16.6667 16.6667H2.49999C2.04166 16.6667 1.6493 16.5035 1.32291 16.1771C0.996523 15.8507 0.833328 15.4584 0.833328 15V5.83337H2.49999V15H16.6667V16.6667Z" />
        </svg>
        <div className=" ml-s-0.5">Receivables</div>
      </Link>
    </div>
  );

  useEffect(() => {
    if (nav.pathname.endsWith('dashboard') && selectedTab !== '1') {
      tabChange('1');
    } else if (nav.pathname.includes('customers') && selectedTab !== '2') {
      tabChange('2');
    } else if (nav.pathname.endsWith('facility') && selectedTab !== '3') {
      tabChange('3');
    } else if (nav.pathname.includes('shipment')) {
      tabChange('0');
    }
  }, [nav, selectedTab]);

  return (
    <Tabs
      activeKey={selectedTab}
      onChange={tabChange}
      animated={{
        inkBar: true,
        tabPane: true,
      }}
      items={[
        {
          key: '1',
          label: (
            <Link
              to="/dashboard"
              className={[
                'flex items-center',
                selectedTab === '1' ? 'text-sky-600' : 'text-gray-600',
                'hover:text-sky-600',
              ].join(' ')}
            >
              <Home4LineIcon className="inline-block mr-s-2" />
              <span>Account overview</span>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Popover placement="bottom" content={debenturesSubmenu} arrow={false}>
              <div
                className={[
                  'px-s-4 flex items-center',
                  selectedTab === '2' ? 'text-sky-600' : 'text-gray-600',
                  'hover:text-sky-600',
                ].join(' ')}
                onClick={(e) => e.stopPropagation()}
              >
                <ArchiveLineIcon className="inline-block mr-s-2" />
                <span>Debentures</span>
              </div>
            </Popover>
          ),
        },
        {
          key: '3',
          label: (
            <Link
              to="/dashboard/customers/facility"
              className={[
                'hidden',
                'px-s-4 flex items-center',
                selectedTab === '3' ? 'text-sky-600' : 'text-gray-600',
                'hover:text-sky-600',
              ].join(' ')}
            >
              <span className="inline-block text-lg mr-s-2">$</span>
              <span>Facility</span>
            </Link>
          ),
        },
      ]}
    />
  );
}
