import Link, { LinkProps } from 'next/link';
import React from 'react';
import { ButtonProps } from '@material-ui/core/Button';

// From:
// https://gist.github.com/herr-vogel/0b5d4f3c28f08dc6cc4a2fd4f7b4a4df#gistcomment-3051542

/**
 * We need to Omit from the MUI Button the {href} prop
 * as we have to handle routing with Next.js Router
 * so we block the possibility to specify an href.
 */

export type ButtonLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const ButtonLink = React.forwardRef<ButtonLinkProps, any>(
  ({ href, as, prefetch, ...props }, ref) => (
    <Link href={href} as={as}>
      <div ref={ref} {...props} />
    </Link>
  ),
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;

// import * as React from 'react';
// import clsx from 'clsx';
// import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
// import NextLink, { LinkProps as NextLinkProps } from 'next/link';
// import { useRouter } from 'next/router';
// // https://gist.github.com/herr-vogel/0b5d4f3c28f08dc6cc4a2fd4f7b4a4df#gistcomment-3288352
// /* eslint-disable jsx-a11y/anchor-has-content */

// type NextComposedProps = Omit<
//   React.AnchorHTMLAttributes<HTMLAnchorElement>,
//   'href'
// > &
//   NextLinkProps;

// const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
//   (props, ref) => {
//     const {
//       as,
//       href,
//       replace,
//       scroll,
//       passHref,
//       shallow,
//       prefetch,
//       ...other
//     } = props;

//     return (
//       <NextLink
//         href={href}
//         prefetch={prefetch}
//         as={as}
//         replace={replace}
//         scroll={scroll}
//         shallow={shallow}
//         passHref={passHref}
//       >
//         <a ref={ref} {...other} />
//       </NextLink>
//     );
//   },
// );

// interface LinkPropsBase {
//   activeClassName?: string;
//   innerRef?: React.Ref<HTMLAnchorElement>;
//   naked?: boolean;
// }

// export type LinkProps = LinkPropsBase &
//   NextComposedProps &
//   Omit<MuiLinkProps, 'href'>;

// // A styled version of the Next.js Link component:
// // https://nextjs.org/docs/#with-link
// function Link(props: LinkProps) {
//   const {
//     href,
//     activeClassName = 'active',
//     className: classNameProps,
//     innerRef,
//     naked,
//     ...other
//   } = props;

//   const router = useRouter();
//   const pathname = typeof href === 'string' ? href : href.pathname;
//   const className = clsx(classNameProps, {
//     [activeClassName]: router.pathname === pathname && activeClassName,
//   });

//   if (naked) {
//     return (
//       <NextComposed
//         className={className}
//         ref={innerRef}
//         href={href}
//         {...other}
//       />
//     );
//   }

//   return (
//     <MuiLink
//       component={NextComposed}
//       className={className}
//       ref={innerRef}
//       href={href as string}
//       {...other}
//     />
//   );
// }

// export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
//   <Link {...props} innerRef={ref} />
// ));
