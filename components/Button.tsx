import * as React from "react";

/**
 * Express button.
 *
 * Four variants, mapped to the semantic action tokens so they follow the active
 * register. In the default (corporate) register primary is deep blue with a 9px
 * radius; set data-brand-mode="franchise" on an ancestor and the same component
 * renders purple, uppercase and 5px without a prop change.
 *
 * Labels are always an imperative verb: "Search job openings", "Find a location",
 * "Request staff". Never "Click here", never "Submit".
 */

type Variant = "primary" | "secondary" | "accent" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--brand-type-radius)] " +
  "border border-transparent px-6 py-2 text-base font-medium no-underline " +
  "transition-colors duration-150 " +
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 " +
  "focus-visible:outline-brandFocusRing " +
  "disabled:cursor-not-allowed disabled:bg-brandActionDisabledBg " +
  "disabled:text-brandActionDisabledFg disabled:border-transparent";

const variants: Record<Variant, string> = {
  primary:
    "bg-brandActionPrimaryBg text-brandActionPrimaryFg " +
    "hover:bg-brandActionPrimaryBgHover hover:text-brandActionPrimaryFgHover",
  secondary:
    "bg-brandActionSecondaryBg text-brandActionSecondaryFg border-brandActionSecondaryBorder " +
    "hover:bg-brandActionPrimaryBg hover:text-brandActionPrimaryFg",
  accent:
    "bg-brandActionAccentBg text-brandActionAccentFg " +
    "hover:bg-brandBgDefault hover:text-brandActionAccentBg hover:border-brandActionAccentBg",
  ghost:
    "bg-transparent text-brandActionGhostFg underline underline-offset-2 px-0 " +
    "hover:text-brandTextLinkHover",
};

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: undefined;
};

type LinkElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  /** Render as an anchor. Use for navigation; keep the button element for actions. */
  href: string;
};

export type ButtonProps = ButtonElementProps | LinkElementProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...buttonProps } = props;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}

export default Button;
