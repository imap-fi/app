import { ReactNode } from 'react';

export interface User {
  mailBox: {
    username: string;
    active: number;
    domain: string;
    relayhost?: string | null;
    name: string;
    local_part: string;
    quota: number;
    messages: number;
    attributes: {
      force_pw_update: string;
      tls_enforce_in: string;
      tls_enforce_out: string;
      sogo_access: string;
      imap_access: string;
      smtp_access: string;
      pop3_access: string;
      sieve_access: string;
      relayhost: string;
      passwd_update: string;
      mailbox_format: string;
      quorantine_notification: string;
      quorantine_category: string;
    };
    quota_used: number;
    percent_in_use: number;
    percent_class: string;
    last_imap_login: number;
    last_smtp_login: number;
    last_pop3_login: number;
    max_new_quota: number;
    spam_aliases: number;
    pushover_active: number;
    rl: boolean;
    rl_scope: string;
    is_relayed: number;
  };
}

export interface Tab {
  name: string;
  link: string;
  icon?: ReactNode;
}
