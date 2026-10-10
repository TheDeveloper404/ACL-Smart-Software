import { Fragment } from 'react';
import Image from 'next/image';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { UsersThreeIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';
import { BookOpenIcon } from '@phosphor-icons/react/dist/ssr/BookOpen';
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { Link } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { getCases } from '@/data';
import { homeProjects, projectAnchor } from '@/lib/project-selection';
import MotionSurface from '@/components/ui/MotionSurface';

export default async function FeaturedProjects() {
  const locale = await getLocale();
  const en = locale === 'en';
  const projects = homeProjects(getCases(locale));
  const names: Record<string, string> = {
    'meridian-transconstruct': 'Meridian', detalia: 'Detalia',
    'seminarul-teologic-filadelfia': en ? 'Filadelfia Seminary' : 'Seminarul Filadelfia',
  };
  const labels: Record<string, string> = en
    ? { 'meridian-transconstruct': 'Construction company website', detalia: 'Professional platform for construction', 'seminarul-teologic-filadelfia': 'Student and teacher portal' }
    : { 'meridian-transconstruct': 'Website pentru o firmă de construcții', detalia: 'Platformă profesională pentru construcții', 'seminarul-teologic-filadelfia': 'Portal pentru studenți și profesori' };
  const facts = {
    detalia: {
      title: en ? 'Different roles. Shared solutions.' : 'Roluri diferite. Soluții împreună.',
      description: en ? 'A shared space where architects, builders and clients propose and validate construction details.' : 'Un spațiu comun în care arhitecții, constructorii și beneficiarii propun și validează detalii de execuție.',
      detail: en ? '3 roles' : '3 roluri',
      detailDescription: en ? 'Architects · Builders · Clients' : 'Arhitecți · Constructori · Beneficiari',
      Icon: UsersThreeIcon,
    },
    'seminarul-teologic-filadelfia': {
      title: en ? 'Courses. Materials. One portal.' : 'Cursuri. Materiale. Un singur portal.',
      description: en ? 'The seminary needed a portal for students and teachers to access courses and educational materials.' : 'Seminarul avea nevoie de un portal în care studenții și profesorii să aibă acces la cursuri și materiale educaționale.',
      detail: en ? 'Access to courses' : 'Acces la cursuri',
      detailDescription: en ? 'For students and teachers' : 'Pentru studenți și profesori',
      Icon: BookOpenIcon,
    },
    'meridian-transconstruct': {
      title: en ? 'Real projects. Direct contact.' : 'Lucrări reale. Contact direct.',
      description: en ? 'Construction services, completed work and quote requests, accessible from the same website.' : 'Serviciile, lucrările și cererile de ofertă, accesibile de pe același site al firmei de construcții.',
      detail: en ? 'Quote requests' : 'Cereri de ofertă',
      detailDescription: en ? 'Direct contact with the company' : 'Contact direct cu firma',
      Icon: EnvelopeSimpleIcon,
    },
  };
  return <section className="section featured-projects" id="proiecte"><div className="wrap">
    <div className="section-heading compact-heading"><div>
      <p className="eyebrow">{en ? 'From idea to launch' : 'De la idee la lansare'}</p>
      <h2>{en ? 'What we have' : 'Ce am'} <em>{en ? 'built.' : 'construit.'}</em></h2>
    </div><Link href="/portofoliu" className="text-link">{en ? 'Explore the portfolio' : 'Explorează portofoliul'} <ArrowUpRightIcon size={18} aria-hidden="true" /></Link></div>
    <MotionSurface className="home-project-grid home-bento">{projects.map(project => {
      const href = `/portofoliu#${projectAnchor(project.slug)}`;
      const name = names[project.slug];
      const fact = facts[project.slug as keyof typeof facts];
      const Icon = fact.Icon;
      return <Fragment key={project.slug}>
        <Link href={href} className="featured-project home-project" data-project={project.slug}
          aria-label={`${name} — ${en ? 'view project details' : 'vezi detaliile proiectului'}`}>
          <div className="featured-project-meta"><span>{labels[project.slug]}</span><h3>{name}</h3></div>
          <div className="bento-project-image">
            {project.image && <Image src={project.image} alt={project.title} fill
              sizes={project.slug === 'detalia' ? '(max-width: 760px) 90vw, 50vw' : '(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 25vw'} />}
          </div>
        </Link>
        <Link href={href} className="home-bento-fact"
          data-project={project.slug} aria-label={`${name} — ${fact.title}`}>
          <p className="bento-fact-project">{name}<span>{en ? 'The need we addressed' : 'Nevoia rezolvată'}</span></p>
          <h4>{fact.title}</h4><p>{fact.description}</p>
        </Link>
        <Link href={href} className="bento-project-detail" data-project={project.slug}
          aria-label={`${name} — ${fact.detail}`}>
          <Icon size={28} weight="light" aria-hidden="true" />
          <div><p className="bento-detail-project">{name}</p><h4>{fact.detail}</h4><p>{fact.detailDescription}</p></div>
        </Link>
      </Fragment>;
    })}</MotionSurface>
  </div></section>;
}
