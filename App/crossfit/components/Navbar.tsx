import React from 'react'
import Link from 'next/link'

function LinkItem(props) {
    return <>
        <div className='ml-3'><Link href={ props.href }>{ props.name }</Link></div>
    </>
}

export default function Navbar() {
    return <div className='w-full bg-white'>

        <div className='text-2xl py-8 container mx-auto bg-white text-black flex flex-row items-center'>

            <Link href='/'>
            <svg width="194" height="61" viewBox="0 0 194 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="MeFit">
                    <mask id="path-1-outside-1" maskUnits="userSpaceOnUse" x="0" y="0" width="194" height="61" fill="black">
                        <rect fill="white" width="194" height="61" />
                        <path d="M14.856 54.92C13.7893 54.92 12.232 54.92 10.184 54.92C8.17867 54.92 6.81333 54.7707 6.088 54.472C5.36267 54.1733 5 53.704 5 53.064V12.68C5 11.6987 6.30133 10.9307 8.904 10.376C11.5493 9.77867 14.3653 9.48 17.352 9.48C20.3387 9.48 22.472 9.864 23.752 10.632C25.032 11.4 25.7787 12.2107 25.992 13.064L30.344 29.96H30.92L35.016 13.832C35.3147 12.68 36.7013 11.6773 39.176 10.824C41.6933 9.928 44.4453 9.48 47.432 9.48C50.4187 9.48 52.616 9.71467 54.024 10.184C55.4747 10.6533 56.2 11.2507 56.2 11.976V53.064C56.2 53.6187 54.984 54.0667 52.552 54.408C50.12 54.7493 47.1547 54.92 43.656 54.92C40.1573 54.92 38.408 54.3013 38.408 53.064C38.408 49.6933 38.7707 43.6987 39.496 35.08H38.92L35.592 51.784C35.464 52.424 34.9307 52.8933 33.992 53.192C33.096 53.4907 31.7307 53.64 29.896 53.64C28.0613 53.64 26.9307 53.512 26.504 53.256C26.12 53 25.864 52.5093 25.736 51.784L22.28 35.08H21.704C22.472 43.8693 22.856 49.864 22.856 53.064C22.856 54.1733 20.1893 54.792 14.856 54.92Z" />
                        <path d="M77.8245 40.456C77.8245 43.2293 79.1472 44.616 81.7925 44.616C83.3285 44.616 85.3338 44.104 87.8085 43.08C90.2832 42.0133 91.5845 41.48 91.7125 41.48C92.5232 41.48 93.5898 42.696 94.9125 45.128C96.2352 47.56 96.8965 49.352 96.8965 50.504C96.8965 52.168 95.1898 53.4267 91.7765 54.28C88.3632 55.1333 85.0138 55.56 81.7285 55.56C78.4858 55.56 75.7552 55.304 73.5365 54.792C71.3605 54.28 69.5685 53.64 68.1605 52.872C66.7952 52.0613 65.5792 51.08 64.5125 49.928C63.4885 48.776 62.7205 47.688 62.2085 46.664C61.6965 45.5973 61.2912 44.424 60.9925 43.144C60.5658 41.2667 60.3525 39.3253 60.3525 37.32C60.3525 29.5547 62.3792 24.2 66.4325 21.256C68.4378 19.7627 70.6778 18.7173 73.1525 18.12C75.6272 17.5227 78.5498 17.224 81.9205 17.224C92.7152 17.224 98.1125 20.9787 98.1125 28.488C98.1125 36.4667 92.0538 40.456 79.9365 40.456H77.8245ZM77.6965 31.112V35.336C78.9338 35.336 79.9365 34.8453 80.7045 33.864C81.5152 32.8827 81.9205 31.688 81.9205 30.28C81.9205 27.72 81.2592 26.44 79.9365 26.44C78.4432 26.44 77.6965 27.9973 77.6965 31.112Z" />
                        <path d="M120.106 53.064C120.106 53.704 118.719 54.1733 115.946 54.472C113.215 54.7707 110.613 54.92 108.138 54.92C105.663 54.92 104.063 54.7707 103.338 54.472C102.613 54.1733 102.25 53.704 102.25 53.064V12.488C102.25 11.3787 102.805 10.5893 103.914 10.12C105.023 9.65067 107.114 9.416 110.186 9.416H133.93C134.826 9.416 135.274 11.0373 135.274 14.28C135.274 17.48 135.061 19.9333 134.634 21.64C134.25 23.304 133.738 24.136 133.098 24.136L120.106 23.496V27.848C125.781 27.592 129.578 27.464 131.498 27.464C132.138 27.464 132.565 27.8053 132.778 28.488C133.034 29.1707 133.162 30.4933 133.162 32.456C133.162 34.376 132.949 36.232 132.522 38.024C132.095 39.7733 131.498 40.648 130.73 40.648L120.106 40.264V53.064Z" />
                        <path d="M157.03 21.832V53.384C157.03 53.8533 155.793 54.2373 153.318 54.536C150.886 54.792 148.369 54.92 145.766 54.92C143.206 54.92 141.542 54.8133 140.774 54.6C140.049 54.344 139.686 53.9387 139.686 53.384V22.984C139.686 22.0453 140.881 21.128 143.27 20.232C145.702 19.2933 148.347 18.824 151.206 18.824C155.089 18.824 157.03 19.8267 157.03 21.832ZM148.326 5C151.142 5 153.339 5.42667 154.918 6.28C156.539 7.09067 157.35 8.584 157.35 10.76C157.35 14.6 154.363 16.52 148.39 16.52C142.417 16.52 139.43 14.6 139.43 10.76C139.43 6.92 142.395 5 148.326 5Z" />
                        <path d="M186.957 54.344C186.189 55.0693 184.44 55.432 181.709 55.432C178.978 55.432 176.717 55.2613 174.925 54.92C173.133 54.536 171.426 53.8107 169.805 52.744C166.69 50.6533 165.133 46.3013 165.133 39.688V29.704H161.933C161.464 29.704 161.058 29.2133 160.717 28.232C160.376 27.2507 160.205 25.9067 160.205 24.2C160.205 22.4933 160.461 21 160.973 19.72C161.528 18.3973 162.232 17.736 163.085 17.736H165.133V9.992C165.133 8.66933 166.413 7.60267 168.973 6.792C171.576 5.98133 174.114 5.576 176.589 5.576C180.472 5.576 182.413 6.536 182.413 8.456V17.736H187.149C188.258 17.736 188.813 19.336 188.813 22.536C188.813 24.6267 188.557 26.3547 188.045 27.72C187.576 29.0427 186.957 29.704 186.189 29.704H182.413V41.416C182.413 42.568 182.904 43.4 183.885 43.912C184.866 44.3813 185.72 44.616 186.445 44.616C187.213 44.616 187.682 44.9787 187.853 45.704C188.024 46.4293 188.109 47.5173 188.109 48.968C188.109 51.8267 187.725 53.6187 186.957 54.344Z" />
                    </mask>
                    <path d="M14.856 54.92C13.7893 54.92 12.232 54.92 10.184 54.92C8.17867 54.92 6.81333 54.7707 6.088 54.472C5.36267 54.1733 5 53.704 5 53.064V12.68C5 11.6987 6.30133 10.9307 8.904 10.376C11.5493 9.77867 14.3653 9.48 17.352 9.48C20.3387 9.48 22.472 9.864 23.752 10.632C25.032 11.4 25.7787 12.2107 25.992 13.064L30.344 29.96H30.92L35.016 13.832C35.3147 12.68 36.7013 11.6773 39.176 10.824C41.6933 9.928 44.4453 9.48 47.432 9.48C50.4187 9.48 52.616 9.71467 54.024 10.184C55.4747 10.6533 56.2 11.2507 56.2 11.976V53.064C56.2 53.6187 54.984 54.0667 52.552 54.408C50.12 54.7493 47.1547 54.92 43.656 54.92C40.1573 54.92 38.408 54.3013 38.408 53.064C38.408 49.6933 38.7707 43.6987 39.496 35.08H38.92L35.592 51.784C35.464 52.424 34.9307 52.8933 33.992 53.192C33.096 53.4907 31.7307 53.64 29.896 53.64C28.0613 53.64 26.9307 53.512 26.504 53.256C26.12 53 25.864 52.5093 25.736 51.784L22.28 35.08H21.704C22.472 43.8693 22.856 49.864 22.856 53.064C22.856 54.1733 20.1893 54.792 14.856 54.92Z" stroke="black" stroke-width="10" mask="url(#path-1-outside-1)" />
                    <path d="M77.8245 40.456C77.8245 43.2293 79.1472 44.616 81.7925 44.616C83.3285 44.616 85.3338 44.104 87.8085 43.08C90.2832 42.0133 91.5845 41.48 91.7125 41.48C92.5232 41.48 93.5898 42.696 94.9125 45.128C96.2352 47.56 96.8965 49.352 96.8965 50.504C96.8965 52.168 95.1898 53.4267 91.7765 54.28C88.3632 55.1333 85.0138 55.56 81.7285 55.56C78.4858 55.56 75.7552 55.304 73.5365 54.792C71.3605 54.28 69.5685 53.64 68.1605 52.872C66.7952 52.0613 65.5792 51.08 64.5125 49.928C63.4885 48.776 62.7205 47.688 62.2085 46.664C61.6965 45.5973 61.2912 44.424 60.9925 43.144C60.5658 41.2667 60.3525 39.3253 60.3525 37.32C60.3525 29.5547 62.3792 24.2 66.4325 21.256C68.4378 19.7627 70.6778 18.7173 73.1525 18.12C75.6272 17.5227 78.5498 17.224 81.9205 17.224C92.7152 17.224 98.1125 20.9787 98.1125 28.488C98.1125 36.4667 92.0538 40.456 79.9365 40.456H77.8245ZM77.6965 31.112V35.336C78.9338 35.336 79.9365 34.8453 80.7045 33.864C81.5152 32.8827 81.9205 31.688 81.9205 30.28C81.9205 27.72 81.2592 26.44 79.9365 26.44C78.4432 26.44 77.6965 27.9973 77.6965 31.112Z" stroke="black" stroke-width="10" mask="url(#path-1-outside-1)" />
                    <path d="M120.106 53.064C120.106 53.704 118.719 54.1733 115.946 54.472C113.215 54.7707 110.613 54.92 108.138 54.92C105.663 54.92 104.063 54.7707 103.338 54.472C102.613 54.1733 102.25 53.704 102.25 53.064V12.488C102.25 11.3787 102.805 10.5893 103.914 10.12C105.023 9.65067 107.114 9.416 110.186 9.416H133.93C134.826 9.416 135.274 11.0373 135.274 14.28C135.274 17.48 135.061 19.9333 134.634 21.64C134.25 23.304 133.738 24.136 133.098 24.136L120.106 23.496V27.848C125.781 27.592 129.578 27.464 131.498 27.464C132.138 27.464 132.565 27.8053 132.778 28.488C133.034 29.1707 133.162 30.4933 133.162 32.456C133.162 34.376 132.949 36.232 132.522 38.024C132.095 39.7733 131.498 40.648 130.73 40.648L120.106 40.264V53.064Z" stroke="black" stroke-width="10" mask="url(#path-1-outside-1)" />
                    <path d="M157.03 21.832V53.384C157.03 53.8533 155.793 54.2373 153.318 54.536C150.886 54.792 148.369 54.92 145.766 54.92C143.206 54.92 141.542 54.8133 140.774 54.6C140.049 54.344 139.686 53.9387 139.686 53.384V22.984C139.686 22.0453 140.881 21.128 143.27 20.232C145.702 19.2933 148.347 18.824 151.206 18.824C155.089 18.824 157.03 19.8267 157.03 21.832ZM148.326 5C151.142 5 153.339 5.42667 154.918 6.28C156.539 7.09067 157.35 8.584 157.35 10.76C157.35 14.6 154.363 16.52 148.39 16.52C142.417 16.52 139.43 14.6 139.43 10.76C139.43 6.92 142.395 5 148.326 5Z" stroke="black" stroke-width="10" mask="url(#path-1-outside-1)" />
                    <path d="M186.957 54.344C186.189 55.0693 184.44 55.432 181.709 55.432C178.978 55.432 176.717 55.2613 174.925 54.92C173.133 54.536 171.426 53.8107 169.805 52.744C166.69 50.6533 165.133 46.3013 165.133 39.688V29.704H161.933C161.464 29.704 161.058 29.2133 160.717 28.232C160.376 27.2507 160.205 25.9067 160.205 24.2C160.205 22.4933 160.461 21 160.973 19.72C161.528 18.3973 162.232 17.736 163.085 17.736H165.133V9.992C165.133 8.66933 166.413 7.60267 168.973 6.792C171.576 5.98133 174.114 5.576 176.589 5.576C180.472 5.576 182.413 6.536 182.413 8.456V17.736H187.149C188.258 17.736 188.813 19.336 188.813 22.536C188.813 24.6267 188.557 26.3547 188.045 27.72C187.576 29.0427 186.957 29.704 186.189 29.704H182.413V41.416C182.413 42.568 182.904 43.4 183.885 43.912C184.866 44.3813 185.72 44.616 186.445 44.616C187.213 44.616 187.682 44.9787 187.853 45.704C188.024 46.4293 188.109 47.5173 188.109 48.968C188.109 51.8267 187.725 53.6187 186.957 54.344Z" stroke="black" stroke-width="10" mask="url(#path-1-outside-1)" />
                </g>
            </svg>
            </Link>

            <div className='ml-auto flex flex-row'>
                <LinkItem href='/' name='Home' />
                <LinkItem href='/athletes' name='Athletes'/>
                <LinkItem href='/competitions' name='Competitions'/>
                <LinkItem href='/partners' name='Partners'/>
            </div>

        </div>

    </div>
}
