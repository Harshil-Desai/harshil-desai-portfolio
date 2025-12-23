import {
    SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiAngular,
    SiNodedotjs, SiExpress, SiNestjs,
    SiPostgresql, SiMongodb, SiRedis,
    SiDocker, SiGit, SiApachejmeter, SiApachekafka,
    SiGithub,
    SiJenkins,
    SiJest,
    SiPostman
} from "react-icons/si";

export const stack = [
    {
        category: "Frontend",
        items: [
            { name: "ReactJS", icon: SiReact },
            { name: "NextJS", icon: SiNextdotjs },
            { name: "TypeScript", icon: SiTypescript },
            { name: "JavaScript", icon: SiJavascript },
            { name: "TailwindCSS", icon: SiTailwindcss },
            { name: "Angular", icon: SiAngular },
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "NodeJS", icon: SiNodedotjs },
            { name: "ExpressJS", icon: SiExpress },
            { name: "NestJS", icon: SiNestjs },
        ]
    },
    {
        category: "Database",
        items: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "MongoDB", icon: SiMongodb },
            { name: "PostGIS", icon: SiPostgresql }, // PostGIS uses same icon
            { name: "Redis", icon: SiRedis },
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Docker", icon: SiDocker },
            { name: "Git", icon: SiGit },
            { name: "Jenkins", icon: SiJenkins },
            { name: "Jest", icon: SiJest },
            { name: "Postman", icon: SiPostman },
            { name: "Kafka", icon: SiApachekafka },
        ]
    }
];
