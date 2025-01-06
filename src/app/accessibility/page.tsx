"use client";

import Heading from "@/components/Heading/Heading";
import Text from "@/components/Text/Text";
import Link from "@/components/Link/Link";
import Badge from "@/components/Badge/Badge";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css";

const Accessibility = () => {
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Barrierefreiheit", href: "/accessibility" },
    ];

    return (
        <div className={styles.container}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <Heading as="h1" variant="xl" headingText="Erklärung zur Barrierefreiheit" />
            <section className={`${styles.accessibilitySection} ${styles.principle}`}>
                <Text variant="md">
                    Diese Erklärung zur Barrierefreiheit gilt für die Webanwendung <i>Skin Cancer Detection</i>. Wir
                    sind benüht die Webanwendung barrierefrei zugänglich zu gestalten und die WCAG-Richtlinien 2.2 (Web
                    Content Accessibility Guidelines) in den Konformitätsstufen A und AA zu erfüllen. <br />
                    <br />
                    Die Grundlage zur Barrierefreiheit bilden vier Prinzipien:
                </Text>

                <nav>
                    <ul className={styles.list}>
                        <li>
                            <Link href="#perceivable" linkText="Wahrnehmbarkeit" />
                        </li>
                        <li>
                            <Link href="#operable" linkText="Bedienbarkeit" />
                        </li>
                        <li>
                            <Link href="#understandable" linkText="Verständlichkeit" />
                        </li>
                        <li>
                            <Link href="#robust" linkText="Robustheit" />
                        </li>
                    </ul>
                </nav>

                <Text variant="md">
                    Diesen vier Prinzipien liegen insgesamt 13 Richtlinien zugrunde, die für sich zwar nicht testbar
                    sind, allerdings helfen sie die einzelnen Erfolgskriterien besser zu verstehen und geben einen
                    groben Rahmen vor. Mehr Details zu den Prinzipien, Richtlinien und Erfolgskriterien finden Sie in
                    den{" "}
                    <Link
                        href="https://w3c.github.io/wcag/guidelines/22/"
                        target="_blank"
                        linkText="Web Content Accessibility Guidelines 2.2"
                        iconName="open-in-new"
                        iconPosition="right"
                        iconColor="brand"
                        iconSize={18}
                    />
                    <br />
                    Die Erfolgskriterien sind letztendlich testbar und können in drei Konformitätsstufen erfüllt werden:
                </Text>
                <ul className={styles.list}>
                    <li>
                        <Badge variant="default" text="A" />
                    </li>
                    <li>
                        <Badge variant="default" text="AA" />
                    </li>
                    <li>
                        <Badge variant="default" text="AAA" />
                    </li>
                </ul>
                <Text variant="md">
                    Die folgenden Erfolgskriterien der Konformitätsstufen A und AA wurden umgesetzt:
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.principle}`}>
                <div className={styles.headingAndBadge}>
                    <Heading id="perceivable" as="h3" variant="lg" headingText="1 Wahrnehmbarkeit" />
                    <Badge variant="default" text="Prinzip" />
                </div>
                <Text variant="md">
                    Die Informationen und die Komponenten der Benutzeroberfläche müssen so dargestellt werden, dass die
                    Benutzer sie wahrnehmen können.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="1.1 Textalternativen" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Für alle Nicht-Text-Inhalte müssen Textalternativen bereitgestellt werden, die von assistiven
                    Technologien interpretiert werden können.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.1.1 Nicht-Text-Inhalte" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Für alle Nicht-Text-Inhalte muss eine gleichwertige Textalternative existieren.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="1.2 Zeitbasierte Medien" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">Für zeitbasierte Medien müssen Alternativen bereitgestellt werden.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading
                        as="h5"
                        variant="sm"
                        headingText="1.2.1 Audio-Only und Video-Only-Inhalte (voraufgezeichnet)"
                    />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Für voraufgezeichnete Audio-Only und Video-Only-Medien muss eine Alternative für zeitbasierte Medien
                    bereitgestellt werden, außer die Audioaufnahme oder das Video dient als Medienalternative für
                    Text-Inhalte und sind deutlich als solche gekennzeichnet. Bei voraufgezeichneten reinen
                    Audio-Inhalten muss eine gleichwertige Informationsalternative existieren. Bei voraufgezeichneten
                    reinen Video-Inhalten muss entweder eine zeitbasierte Medienalternative oder eine Audioaufnahme, die
                    gleichwertige Informationen bietet, bereitgestellt werden.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.2.2 Untertitel (voraufgezeichnet)" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Für alle voraufgezeichnete Audio-Inhalte werden Untertitel in synchronisierten Medien
                    bereitgestellt, außer die Medien sind eine Medienalternative für Text-Inhalte und sind deutlich als
                    solche gekennzeichnet.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.2.4 Untertitel (live)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Untertitel werden für alle Live-Audio-Inhalte in synchronisierten Medien bereitgestellt.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.2.5 Audiodeskription (voraufgezeichnet)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Für alle voraufgezeichneten Video-Inhalte wird eine Audiodeskription in synchronisierten Medien
                    bereitgestellt.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="1.3 Anpassungsfähigkeit" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Inhalte sind so zu erstellen, dass sie von assistiven Technologien auf unterschiedlicher Weise
                    dargestellt werden können, ohne dass Informationen oder Strukturen verloren gehen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.3.1 Informationen und Beziehungen" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Informationen, Strukturen und Beziehungen, die durch die Darstellung vermittelt werden, können
                    programmatisch bestimmt werden oder sind in Textform verfügbar.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.3.2 Sinnvolle Reihenfolge" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn die Reihenfolge, in der ein Inhalt präsentiert wird, seine Bedeutung beeinflusst, kann die
                    korrekte Lesereihenfolge programmatisch bestimmt werden.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.3.3 Sensorische Eigenschaften" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Anweisungen zum Verständnis und zur Bedienung der Inhalte beruhen nicht allein auf den sensorischen
                    Eigenschaften der Komponente wie Form, Größe, visuelle Position, Ausrichtung oder Ton.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.3.4 Orientierung" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Der Inhalt ist nicht auf eine einzige Displayausrichtung, wie Hoch- oder Querformat, beschränkt,
                    außer eine bestimmte Ausrichtung ist unerlässlich.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.3.5 Zweck von Eingabefeldern identifizieren" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Der Zweck eines jeden Eingabefeldes, welches Benutzerinformationen sammelt, kann programmatisch
                    bestimmt werden, wenn:
                </Text>
                <ul className={styles.list}>
                    <li>
                        Das Eingabefeld dient einem Zweck der in{" "}
                        <Link
                            href="https://w3c.github.io/wcag/guidelines/22/#input-purposes"
                            target="_blank"
                            linkText="Eingabezwecke für Komponenten der Benutzeroberfläche"
                            iconName="open-in-new"
                            iconPosition="right"
                            iconColor="brand"
                            iconSize={18}
                        />{" "}
                        angegeben ist und
                    </li>
                    <li>
                        Der Inhalt mit Technologien implementiert wurde, die die Identifizierung der erwarteten
                        Bedeutung von Formulareingabefeldern unterstützen.
                    </li>
                </ul>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="1.4 Differenzierbarkeit" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Dem Benutzer das Sehen und Hören von Inhalten, einschließlich des Vorder- und Hintergrunds
                    erleichtern.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.1 Verwendung von Farbe" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Farbe darf nicht als einziges Mittel verwendet werden, um Informationen zu vermitteln, eine Aktion
                    anzuzeigen oder ein visuelles Element zu kennzeichnen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.2 Steuerung von Ton" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn ein Ton auf einer Webseite länger als 3 Sekunden automatisch abgespielt wird, muss entweder ein
                    Mechanismus vorhanden sein, mit dem der Ton angehalten oder gestoppt werden kann, oder es muss ein
                    Mechanismus vorhanden sein, mit dem die Lautstärke des Tons unabhängig von der Gesamtlautstärke des
                    Systems geregelt werden kann.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.3 Kontrast (Minimum)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Die visuelle Darstellung von Text und Textbildern hat ein Kontrastverhältnis von mindestens 4,5:1.
                    Dabei gelten folgende Ausnahmen:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Großer Text (mindestens 18 Punkt oder 14 Punkt Fettdruck): Großflächiger Text und Bilder von
                        großflächigem Text haben ein Kontrastverhältnis von mindestens 3:1
                    </li>
                    <li>
                        Nebensächlichkeit: Text oder Bilder von Text, die Teil einer interaktiven Komponente der
                        Benutzeroberfläche sind, die zur reinen Dekoration dienen, die für niemanden sichtbar sind oder
                        die Teil eines Bildes sind, das bedeutende andere visuelle Inhalte enthält, müssen keinen
                        Kontrast aufweisen.
                    </li>
                    <li>
                        Logotypen: Text, der Teil eines Logos oder Markennamens ist, muss keinen Kontrast aufweisen.
                    </li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.4 Textgröße ändern" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Mit Ausnahme von Bildunterschriften und Textabbildungen kann die Größe von Text ohne Hilfsmittel bis
                    zu 200 Prozent verändert werden, ohne dass Inhalt oder Funktionalität verloren gehen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.5 Bilder von Text" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Wenn die verwendeten Technologien die visuelle Darstellung ermöglichen können, wird Text anstelle
                    von Bildern von Text zur Informationsvermittlung verwendet. Dabei gelten folgende Ausnahmen:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Anpassbarkeit: Das Textbild kann visuell an die Anforderungen des Benutzers angepasst werden
                    </li>
                    <li>
                        Essentiell: Eine bestimmte Textdarstellung ist für die zu vermittelnde Information essenziell
                        (hierzu zählen auch Logotypen)
                    </li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.10 Reflow" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Der Inhalt kann ohne Informations- oder Funktionsverlust dargestellt werden, ohne dass Scrollen in
                    zwei Dimensionen erforderlich ist. Dies gilt nicht für Teile des Inhalts, die für die Nutzung oder
                    Bedeutung ein zweidimensionales Layout erfordern.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.11  Nicht-Text-Kontrast" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Die visuelle Darstellung der folgenden Elemente hat ein Kontrastverhältnis von mindestens 3:1 zu
                    benachbarten Farben:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Komponenten der Benutzeroberfläche: Visuelle Informationen, die erforderlich sind, um
                        Komponenten und Zustände der Benutzeroberfläche zu identifizieren, außer bei inaktiven
                        Komponenten oder wenn das Aussehen der Komponente vom User-Agent bestimmt und nicht vom Autor
                        geändert wird
                    </li>
                    <li>
                        Graphische Objekte: Teile von Grafiken, die zum Verständnis des Inhalts erforderlich sind, außer
                        eine bestimmte Darstellung von Grafiken ist für die zu vermittelnde Information essentiell
                    </li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.12 Textabstände" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Bei Inhalten, die mit Auszeichnungssprachen implementiert wurden, die diese{" "}
                    <Link
                        href="https://w3c.github.io/wcag/guidelines/22/#dfn-style-properties"
                        target="_blank"
                        linkText="Textstileigenschaften"
                        iconName="open-in-new"
                        iconPosition="right"
                        iconColor="brand"
                        iconSize={18}
                    />{" "}
                    unterstützen, kommt es zu keinem Inhalts- oder Funktionalitätsverlust, wenn alle folgenden
                    Einstellungen vorgenommen werden und keine andere Stileigenschaft geändert wird:
                </Text>
                <ul className={styles.list}>
                    <li>Zeilenhöhe auf mindestens das 1,5-fache der Schriftgröße</li>
                    <li>Abstand nach Absätzen auf mindestens das 2-fache der Schriftgröße</li>
                    <li>Buchstabenabstand auf mindestens das 0,12-fache der Schriftgröße</li>
                    <li>Wortabstand auf mindestens das 0,16-fache der Schriftgröße</li>
                </ul>
                <Text variant="md">
                    Ausnahmen: Menschliche Sprachen und Schriften, die eine oder mehrere dieser Textstileigenschaften im
                    geschriebenen Text nicht verwenden, können nur die Eigenschaften verwenden, die für diese
                    Kombination von Sprache und Schrift existieren.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="1.4.13 Inhalt bei Hover oder Fokus" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Wenn durch das Setzen und Entfernen des Mauszeigers oder des Tastaturfokus zusätzliche Inhalte
                    sichtbar werden und dann Wiede ausgeblendet werden, gilt Folgendes:
                </Text>
                <ul className={styles.list}>
                    <li>
                        Ablehnbar: Es gibt einen Mechanismus, mit dem der zusätzliche Inhalt ausgeblendet werden kann,
                        den Mauszeiger Hover oder den Tastaturfokus zu bewegen, außer der zusätzlich Inhalt übermittelt
                        einen Eingabefehler oder verdeckt oder ersetzt keinen anderen Inhalt
                    </li>
                    <li>
                        Hoverable: Wenn der Hover des Mauszeiger den zusätzlichen Inhalt auslösen kann, dann kann der
                        Mauszeiger über den zusätzlichen Inhalt bewegt werden, ohne dass der zusätzliche Inhalt
                        verschwindet
                    </li>
                    <li>
                        Persistent: Der zusätzliche Inhalt bleibt so lange sichtbar, bis der Hover- oder Fokus-Auslöser
                        entfernt wird, der Benutzer ihn ablehnt oder seine Informationen nicht mehr gültig sind
                    </li>
                </ul>
                <Text variant="md">
                    Ausnahme: Die visuelle Darstellung des zusätzlichen Inhalts wird vom User-Agent gesteuert und nicht
                    vom Autor geändert.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.principle}`}>
                <div className={styles.headingAndBadge}>
                    <Heading id="operable" as="h3" variant="lg" headingText="2 Bedienbarkeit" />
                    <Badge variant="default" text="Prinzip" />
                </div>
                <Text variant="md">
                    Die Komponenten der Benutzeroberfläche und die Navigation müssen funktionsfähig sein.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="2.1 Tastaturzugänglichkeit" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">Die vollständige Funktionalität muss über die Tastatur zugänglich sein.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.1.1 Tastatur" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Alle Funktionen des Inhalts müssen mit der Tastatur bedienbar sein, ohne dass spezifische
                    Zeitvorgaben für einzelne Tastenanschläge erforderlich sind, außer die zugrunde liegende Funktion
                    erfordert Eingaben, die vom Bewegungspfad des Nutzers und nicht nur von den Endpunkten abhängen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.1.2 Keine Tastatur-Trap" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn der Tastaturfokus über eine Tastaturschnittstelle zu einer Komponente verschoben werden kann,
                    dann kann der Fokus nur über eine Tastaturschnittstelle von der Komponente wegbewegt werden, und
                    wenn dazu mehr als unmodifizeirte Pfeil- oder Tabulatortasten oder andere standardisierte
                    Beendigungsmethoden erforderlich sind, wird der Benutzer auf die Methode zum Wegbewegen des Fokus
                    hingewiesen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.1.4 Tastenkombinationen für Zeichen" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn eine Tastenkombination in einem Inhalt implementiert ist, der nur Buchstaben, Satzzeichen,
                    Zahlen oder Symbole verwendet, dann ist mindestens eine der folgenden Bedingungen erfüllt:
                </Text>

                <ul className={styles.list}>
                    <li>Ausschalten: Es ist ein Mechanismus vorhanden, um die Tastenkombination zu deaktivieren</li>
                    <li>
                        Neu zuordnen: Es ist ein Mechanismus verfügbar um die Tastenkombination neu zuzuordnen, so dass
                        sie eine oder mehrere nicht druckbare Tastaturtasten, wie Strg oder Alt, enthält
                    </li>
                    <li>
                        Persistent: Der zusätzliche Inhalt bleibt so lange sichtbar, bis der Hover- oder Fokus-Auslöser
                        entfernt wird, der Benutzer ihn ablehnt oder seine Informationen nicht mehr gültig sind
                    </li>
                    <li>
                        Nur bei Fokus aktiv: Das Tastaturkürzel für eine Komponente der Benutzeroberfläche ist nur
                        aktiv, wenn dies Komponente den Fokus besitzt.
                    </li>
                </ul>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="2.2 Ausreichend Zeit" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Dem Benutzer genügend Zeit bereitstellen, um die Inhalte zu lesen und zu nutzen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.2.1 Zeitlimits anpassen" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Für jedes Zeitlimit, welches durch den Inhalt festgelegt wird, ist mindestens eine der folgenden
                    Bedingungen erfüllt:
                </Text>

                <ul className={styles.list}>
                    <li>Ausschalten: Der Benutzer kann das Zeitlimit ausschalten, bevor es auftritt</li>
                    <li>
                        Anpassen: Der Benutzer kann das Zeitlimit in einem weiten Bereich, der mindestens zehnmal so
                        lang ist wie die Standardeinstellung , anpassen, bevor es auftritt
                    </li>
                    <li>
                        Verlängern: Der Benutzer wird vor dem Ablauf der Zeit gewarnt und hat mindestens 20 Sekunden
                        Zeit das Zeitlimit mir einer einfachen Aktion (beispielsweise „Drücken Sie die Leertaste“) zu
                        verlängern und der Benutzer darf das Zeitlimit mindestens zehnmal verlängern
                    </li>
                    <li>
                        Echtzeit-Ausnahme: Das Zeitlimit ist ein notwendiger Bestandteil eines Echtzeit-Ereignisses
                        (beispielsweise einer Auktion) und es gibt keine Alternative zum Zeitlimit
                    </li>
                    <li>
                        Essentielle Ausnahme: Das Zeitlimit ist essentiell und eine Verlängerung würde die Aktivität
                        ungültig machen
                    </li>
                    <li>20-Stunden-Ausnahme: Das Zeitlimit ist länger als 20 Stunden.</li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.2.2 Pausieren, Stoppen, Verstecken" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Für sich bewegende, blinkende, schrillende oder automatisch aktualisierende Informationen treffen
                    alle der folgenden Punkte zu:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Bewegen, Blinken, Scrollen: Für alle sich bewegenden, blinkenden oder scrollenden Informationen,
                        die (1) automatisch starten, (2) länger als fünf Sekunden dauern und (3) parallel zu anderen
                        Inhalten dargestellt werden, gibt es einen Mechanismus, mit dem der Benutzer sie anhalten,
                        stoppen oder ausblenden kann, außer, das Bewegen, Blinken oder Scrollen ist Teil einer
                        Aktivität, für die es unerlässlich ist
                    </li>
                    <li>
                        Automatische Aktualisierung: Für jede automatisch aktualisierende Information, die (1)
                        automatisch startet und (2) parallel zu anderen Inhalten dargestellt wird, gibt es einen
                        Mechanismus, mit dem der Benutzer sie anhalten, stoppen oder ausblenden oder die Häufigkeit der
                        Aktualisierung kontrollieren kann, außer die automatische Aktualisierung ist Teil einer
                        Aktivität für die sie unerlässlich ist.
                    </li>
                </ul>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="2.3 Krampfanfälle und körperliche Reaktionen" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Inhalte dürfen nicht in einer Art entworfen werden, die bekanntermaßen Krampfanfälle oder
                    körperliche Reaktionen auslösen können.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading
                        as="h5"
                        variant="sm"
                        headingText="2.3.1 Dreimaliges Aufblitzen oder Unterschreiten des Schwellenwerts"
                    />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Webseiten enthalten keine Elemente, die innerhalb einer Sekunde mehr als dreimal aufblitzen oder das
                    Aufblitzen liegt unterhalb der Schwellenwerte für{" "}
                    <Link
                        href="https://w3c.github.io/wcag/guidelines/22/#dfn-general-flash-and-red-flash-thresholds"
                        target="_blank"
                        linkText="allgemeines und rotes Aufblitzen"
                        iconName="open-in-new"
                        iconPosition="right"
                        iconColor="brand"
                        iconSize={18}
                    />
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="2.4 Navigation" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Möglichkeiten für den Benutzer zur Navigation, zum Auffinden von Inhalten und zur Bestimmung seines
                    Standorts bereitstellen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.1 Blöcke umgehen" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Es existiert ein Mechanismus zur Umgehung von Inhaltsblöcken, die auf mehreren Webseiten wiederholt
                    werden.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.2 Seitentitel" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">Webseiten haben Titel, die das Theme oder den Zweck beschreiben.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.3 Fokus-Reihenfolge" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn eine Webseite sequentiell navigiert werden kann und die Navigationssequenzen die Bedeutung oder
                    Bedienung beeinflussen, erhalten fokussierbare Komponenten den Fokus in einer Reihenfolge, die die
                    Bedeutung und Bedienbarkeit bewahrt.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.4 Zweck eines Links (im Kontext)" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Der Zweck eines jeden Links kann aus dem Linktext allein oder aus dem Linktext zusammen mit den
                    programmatisch bestimmten Linkkontext bestimmt werden, außer der Zweck des Links wäre für die
                    Benutzer im Allgemeinen unklar.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.5 Mehrere Möglichkeiten" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Es gibt mehr als eine Möglichkeit eine Webseite innerhalb eines Webseiten-Sets zu finden, außer die
                    Webseite ist das Ergebnis eines Prozesses oder ein Schritt in einem Prozess.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.6 Headings und Labels" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">Überschriften und Etiketten beschreiben das Thema oder den Zweck.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.7 Sichtbarer Fokus" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Jede über die Tastatur bedienbare Benutzeroberfläche verfügt über einen Betriebsmodus, in dem der
                    Tastaturfokusindikator sichtbar ist.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.4.11 Nicht verdeckter Fokus (Minimum)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Wenn eine Komponente der Benutzeroberfläche den Tastaturfokus erhält, wird die Komponenten aufgrund
                    des vom Autor erstellten Inhalts nicht vollständig ausgeblendet.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="2.5 Eingabemodalitäten" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Den Benutzern die Bedienung der Funktionen durch verschiedene Eingaben über die Tastatur hinaus
                    erleichtern.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.5.1 Gesten mit einem Mauszeiger" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Alle Funktionen, die Mehrpunkt- oder pfadbasierte Gesten zur Bedienung verwenden, können mit einem
                    einzigen Mauszeiger ohne pfadbasierte Geste bedient werden, außer eine Mehrpunkt- oder pfadbasierter
                    Geste ist unerlässlich.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.5.2 Auflösung von Mauszeigern" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Bei Funktionen, die mit einem einzigen Mauszeiger bedient werden können, ist mindestens eine der
                    folgenden Bedingung erfüllt:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Kein Down-Event: Das Down-Event des Zeigers wird nicht zur Ausführung eines Teils der Funktion
                        verwendet
                    </li>
                    <li>
                        Abbruch oder Rückgängig machen: Die Funktion wird mit dem Up-Ereignis abgeschlossen und es ist
                        ein Mechanismus vorhanden, um die Funktion vor dem Abschluss abzubrechen oder ach dem Abschluss
                        rückgängig zu machen
                    </li>
                    <li>
                        Up-Umkehrung: Das Up-Ereignis macht das Ergebnis des vorangegangenen Down-Ereignisses rückgängig
                    </li>
                    <li>Essentiell: Der Abschluss der Funktion beim Down-Ereignis ist unerlässlich.</li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.5.3 Label in Name" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Bei Komponenten der Benutzeroberfläche mit Beschriftungen, die Text oder Bilder von Text enthalten,
                    enthält der Name den Text, der visuell dargestellt wird.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.5.4 Bewegungsaktivierung" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Funktionen, die durch die Bewegung des Geräts oder des Benutzers gesteuert werden können, können
                    auch durch Komponenten der Benutzeroberfläche gesteuert werden und die Reaktion auf die Bewegung
                    kann deaktiviert werden, um eine versehentliche Bestätigung zu verhindern, außer wenn:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Unterstützte Schnittstelle: Die Bewegung wird verwendet, um Funktionen über eine barrierefreie
                        Schnittstelle zu bedienen
                    </li>
                    <li>
                        Essentiell: Die Bewegung ist für die Funktion unabdingbar und würde die Aktivität ungültig
                        machen.
                    </li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.5.7 Ziehende Bewegungen" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Alle Funktionen, bei denen eine Ziehbewegung erforderlich ist, können auch mit einem einzigen Zeiger
                    ohne Ziehen erreicht werden, außer das Ziehen ist unerlässlich oder die Funktion wird vom User-Agent
                    bestimmt und vom Autor nicht geändert.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="2.5.8 Zielgröße (Minimum)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Die Größe des Ziels für Zeigereingaben beträgt mindestens 24 x 24 CSS-Pixel, außer wenn:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Abstände: Kleinere Ziele werden so positioniert, dass wenn ein Kreis mit einem Durchmesser von
                        24 CSS-Pixeln auf dem Begrenzungsrahmen eines jeden Ziels zentriert wird, die Kreise kein
                        anderes Ziel oder den Kreis für ein anderes kleineres Ziel überschneiden
                    </li>
                    <li>
                        Äquivalenz: Die Funktion kann durch ein anderes Steuerelement auf derselben Seite erreicht
                        werden, das dieses Kriterium erfüllt
                    </li>
                    <li>
                        Inline: Das Zeil befindet sich in einem Satz oder seine Größe wird anderweitig durch die
                        Zeilenhöhe von Nicht-Ziel-Text eingeschränkt
                    </li>
                    <li>
                        User-Agent-Steuerung: Die Größe des Ziels wird vom User-Agent bestimmt und nicht vom Autor
                        geändert
                    </li>
                    <li>
                        Essentiell: Eine bestimmte Darstellung des Ziels ist für die zu vermittelnde Information
                        essentiell oder gesetzlich vorgeschrieben
                    </li>
                </ul>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.principle}`}>
                <div className={styles.headingAndBadge}>
                    <Heading id="understandable" as="h3" variant="lg" headingText="3 Verständlichkeit" />
                    <Badge variant="default" text="Prinzip" />
                </div>
                <Text variant="md">
                    Die Informationen und die Bedienung der Benutzeroberfläche müssen verständlich sein.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="3.1 Lesbarkeit" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">Textinhalt muss lesbar und verständlich sein.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.1.1 Sprache der Seite" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">Die Standardsprache für jede Webseite kann programmatisch bestimmt werden.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.1.2 Sprache von Teilen der Seite" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Die menschliche Sprache jeder Passage oder jedes Satzes im Inhalt kann programmatisch bestimmt
                    werden, mit ausnähme von Eigennamen, Fachbegriffen, Wörtern mit unbestimmter Sprache und Wörtern
                    oder Sätzen, die Teil der Umgangssprache des unmittelbar umgebenden Textes geworden sind.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="3.2 Berechenbarkeit" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Das Erscheinungsbild und die Funktionsweise von Webseiten müssen vorhersehbar sein.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.2.1 Bei Fokus" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn eine Komponente der Benutzeroberfläche den Fokus erhält, lädt sie keine Änderung des Kontexts
                    aus.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.2.2 Bei Eingabe" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Eine Änderung der Einstellung einer Komponente der Benutzeroberfläche führt nicht automatisch zu
                    einer Änderung des Kontexts, außer der Benutzer wurde vor der Verwendung der Komponente auf dieses
                    Verhalten hingewiesen.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.2.3 Konsistente Navigation" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Navigationsmechanismen, die auf mehreren Webseiten innerhalb eines Webseiten-Sets wiederholt werden,
                    treten bei jeder Wiederholung in der gleichen Reihenfolge auf, außer den Benutzer hat eine Änderung
                    veranlasst.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.2.4 Konsistente Identifikation" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Komponenten, die innerhalb eines Webseiten-Sets dieselbe Funktionalität aufweisen, werden
                    einheitlich identifiziert.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.2.6 Konsistente Hilfe" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn eine Webseite einen der folgenden Hilfemechanismen enthält und diese Mechanismen auf mehreren
                    Webseiten innerhalb eine Webseiten-Sets wiederholt werden, erscheinen sie in der gleichen
                    Reihenfolge in Bezug aug andere Seiteninhalte, außer der Benutzer hat eine Änderung veranlasst:
                </Text>

                <ul className={styles.list}>
                    <li>Angaben zum menschlichen Kontakt</li>
                    <li>Mechanismus für menschlichen Kontakt</li>
                    <li>Ein vollautomatischer Kontaktmechanismus</li>
                </ul>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="3.3 Unterstützung bei der Eingabe" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">Den Benutzern helfen, Fehler zu vermeiden und zu korrigieren.</Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.3.1 Fehleridentifizierung" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Wenn ein Eingabefehler automatisch erkannt wird, wird das fehlerhafte Element identifiziert und der
                    Fehler dem Benutzer in Textform beschrieben.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.3.2 Labels oder Anweisungen" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Labels oder Anweisungen werden bereitgestellt, wenn der Inhalt eine Benutzereingabe erfordert.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.3.3 Korrekturvorschläge" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Wenn ein Eingabefehler automatisch erkannt wird und Korrekturvorschläge bekannt sind, werden die
                    Vorschläge dem Benutzer zur Verfügung gestellt, außer dies würde die Sicherheit oder den Zweck des
                    Inhalts gefährden.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.3.4 Fehlervermeidung (Recht, Finanzen, Daten)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Für Webseiten, die rechtliche Verpflichtungen oder finanzielle Transaktionen für den Benutzer
                    auslösen, die vom Benutzer kontrollierbare Daten in Datenspeichersystemen ändern oder löschen oder
                    die Textantworten des Benutzers übermitteln, trifft mindestens einer der folgenden Punkte zu:
                </Text>

                <ul className={styles.list}>
                    <li>Umkehrung: Einreichung ist umkehrbar</li>
                    <li>
                        Prüfung: Die vom Benutzer eingegebenen Daten werden auf Eingabefehler geprüft und der Benutzer
                        erhält die Möglichkeit diese zu korrigieren
                    </li>
                    <li>
                        Bestätigung: Es gibt einen Mechanismus zur Überprüfung, Bestätigung und Korrektur von
                        Informationen, bevor die Übermittlung abgeschlossen wird
                    </li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.3.7 Redundanter Eintrag" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Vom Benutzer zuvor eingegebene oder ihm zur Verfügung gestellte Informationen, die in demselben
                    Vorgang erneut eingegeben werden müssen, werden entweder:
                </Text>

                <ul className={styles.list}>
                    <li>Automatisch ausgefüllt, oder</li>
                    <li>Dem Benutzer zur Auswahl zur Verfügung gestellt</li>
                </ul>
                <Text variant="md">Außer wenn:</Text>

                <ul className={styles.list}>
                    <li>Die erneute Eingabe der Informationen unerlässlich ist,</li>
                    <li>Die Informationen erforderlich sind, um die Sicherheit des Inhalts zu gewährleisten, oder</li>
                    <li>Die zuvor eingegebenen Informationen nicht mehr gültig sind.</li>
                </ul>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="3.3.8 Zugängliche Authentifizierung (Minimum)" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    Ein kognitiver Funktionstest (beispielsweise das Merken eines Passworts oder das Lösen eines
                    Rätsels) ist für keinen Schritt in einem Authentifizierungsverfahren erforderlich, außer dieser
                    Schritt bietet mindestens eine der folgenden Möglichkeiten:
                </Text>

                <ul className={styles.list}>
                    <li>
                        Alternative: Eine andere Authentifizierungsmethode, die nicht auf einem kognitiven Funktionstest
                        beruht
                    </li>
                    <li>
                        Mechanismus: Es steht ein Mechanismus zur Verfügung, den den Benutzer beim Ausfüllen des
                        kognitiven Funktionstests unterstützt
                    </li>
                    <li>Objekterkennung: Der Test der kognitiven Funktion besteht darin, Objekte zu erkennen.</li>
                    <li>
                        Persönlicher Inhalt: Der kognitive Funktionstest soll nicht-textliche Inhalte erkennen, die der
                        Benutzer der Webseite zur Verfügung gestellt hat
                    </li>
                </ul>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.principle}`}>
                <div className={styles.headingAndBadge}>
                    <Heading id="robust" as="h3" variant="lg" headingText="4 Robustheit" />
                    <Badge variant="default" text="Prinzip" />
                </div>
                <Text variant="md">
                    Die Inhalte müssen so robust sein, dass sie von einer Vielzahl von User-Agents, einschließlich
                    assistiver Technologien, interpretiert werden können.
                </Text>
            </section>

            <section className={`${styles.accessibilitySection} ${styles.guideline}`}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h4" variant="md" headingText="4.1 Kompatibilität" />
                    <Badge variant="default" text="Richtlinie" />
                </div>
                <Text variant="md">
                    Kompatibilität mit aktuellen und zukünftigen User-Agents, einschließlich assisttiver Technologien,
                    maximieren.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="4.1.2 Name, Role, Value" />
                    <Badge variant="primary" text="A" />
                </div>
                <Text variant="md">
                    Für alle Komponenten der Benutzeroberfläche (einschließlich, aber nicht beschränkt auf:
                    Formularelemente, Links, von Skripten generierte Komponenten) können Name und Role programmatisch
                    bestimmte werden. Zustände, Eigenschaften und Values, die vom Benutzer gesetzt werden können, können
                    programmatisch gesetzt werden. Benachrichtigungen über Änderungen an diesen Elementen sind für
                    User-Agents, einschließlich assistiver Technologien, verfügbar.
                </Text>
            </section>

            <section className={styles.accessibilitySection}>
                <div className={styles.headingAndBadge}>
                    <Heading as="h5" variant="sm" headingText="4.1.3 Statusmeldungen" />
                    <Badge variant="primary" text="AA" />
                </div>
                <Text variant="md">
                    In Inhalten, die mit Hilfe von Auszeichnungssprachen implementiert werden, können Statusmeldungen
                    programmatisch durch Role oder Eigenschaften bestimmt werden, so dass sie dem Benutzer durch
                    assistive Technologien präsentiert werden können, ohne dass sie den Fokus erhalten.
                </Text>
            </section>
        </div>
    );
};

export default Accessibility;
