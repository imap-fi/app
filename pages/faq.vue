<template>
  <div>
    <TheHeader />

    <!-- UKK voisi tulla API:sta -->
    <div class="p-8 ml-48 mr-48">
      <FaqSection :title="'Sähköpostin lukeminen'" :content="'Voit lukea sähköpostin webmailistä osoitteessa <a href=\'https://mail.imap.fi\' class=\'link\'>mail.imap.fi</a> ja/tai tietokoneen omalla sähköpostiohjelmalla (katso konfigurointi seuraavasta FAQ-osiosta).'" />
      <FaqSection :title="'Oman sähköpostiohjelman käyttäminen'" :content="'Voit käyttää mitä tahansa sähköpostiohjelmaa, joka tukee IMAP ja SMTP -protokollia. Syötä seuraavat yhdistysasetukset sähköpostiohjelmaasi:<br><br><b>Saapuvan postin palvelin:</b><br>Palvelin: <code>server.imap.fi</code><br>Portti: <code>143</code><br>Salaus: <code>STARTTLS</code><br><br><b>Lähtevän postin palvelin:</b><br>Palvelin: <code>server.imap.fi</code><br>Portti: <code>587</code><br>Salaus: <code>STARTTLS</code>'" />
      <FaqSection :title="'Lisätallennustilan pyytäminen'" :content="'Jos koet tallennustilan loppuvan, lähetä viestiä sähköpostiin increase@imap.fi.'" />
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import FaqSection from '~/components/FaqSection.vue'

export default {
  name: 'FaqPage',
  components: { TheHeader, FaqSection },
}
</script>
